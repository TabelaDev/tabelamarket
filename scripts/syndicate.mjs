#!/usr/bin/env node
/**
 * Sindicada o conteúdo de content/news/ para redes sociais:
 *  - dev.to (artigo completo, canonical_url apontando pro hub)
 *  - Bluesky (texto curto: título + summary + link)
 *
 * Estado commitado em scripts/syndicated.json (mapa slug -> {devtoId, bskyUri, ts})
 * garante idempotência: só posts não sindicados são publicados. A escrita do
 * estado acontece post a post, então um re-run retoma dos que falharam.
 *
 * Depende de secrets (GitHub Actions) ou variáveis de ambiente:
 *  DEVTO_API_KEY, BLUESKY_HANDLE, BLUESKY_APP_PASSWORD.
 *
 * Uso: node scripts/syndicate.mjs [--dry-run]
 *   --dry-run: não publica, só mostra o que faria.
 */
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';
import fm from 'front-matter';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const NEWS_DIR = join(ROOT, 'content/news');
const STATE_FILE = join(ROOT, 'scripts/syndicated.json');
const SITE = 'https://tabelahub.ianptkcs-023.workers.dev';
const PDS = 'https://bsky.social';

const DRY_RUN = process.argv.includes('--dry-run');

function env(name) {
	const v = process.env[name];
	if (!v) throw new Error(`${name} não definida`);
	return v;
}

function loadState() {
	if (!existsSync(STATE_FILE)) return {};
	return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
}

async function saveState(state) {
	const prettierConfig = await resolveConfig(join(ROOT, 'prettier.config.js'));
	writeFileSync(
		STATE_FILE,
		await format(JSON.stringify(state), { ...prettierConfig, parser: 'json' })
	);
}

async function postDevto({ slug, title, body, description, tags }) {
	const key = env('DEVTO_API_KEY');
	/* dev.to: tags em minúsculo, alfanuméricas, máx 4 */
	const cleanTags = tags
		.map((t) =>
			String(t)
				.toLowerCase()
				.replace(/[^a-z0-9_]/g, '')
		)
		.filter(Boolean)
		.slice(0, 4);
	const res = await fetch('https://dev.to/api/articles', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', 'api-key': key },
		body: JSON.stringify({
			article: {
				title,
				body_markdown: body,
				published: true,
				canonical_url: `${SITE}/news/${slug}`,
				description,
				tags: cleanTags
			}
		})
	});
	if (!res.ok) throw new Error(`dev.to ${res.status}: ${await res.text()}`);
	const data = await res.json();
	return String(data.id);
}

async function postBluesky({ slug, title, summary }) {
	const handle = env('BLUESKY_HANDLE');
	const password = env('BLUESKY_APP_PASSWORD');

	const sessionRes = await fetch(`${PDS}/xrpc/com.atproto.server.createSession`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ identifier: handle, password })
	});
	if (!sessionRes.ok)
		throw new Error(`bsky session ${sessionRes.status}: ${await sessionRes.text()}`);
	const session = await sessionRes.json();

	const text = [title, '', summary, `${SITE}/news/${slug}`].filter(Boolean).join('\n');
	const recordRes = await fetch(`${PDS}/xrpc/com.atproto.repo.createRecord`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.accessJwt}` },
		body: JSON.stringify({
			repo: session.did,
			collection: 'app.bsky.feed.post',
			record: { text, createdAt: new Date().toISOString() }
		})
	});
	if (!recordRes.ok) throw new Error(`bsky record ${recordRes.status}: ${await recordRes.text()}`);
	const record = await recordRes.json();
	return record.uri;
}

async function main() {
	const state = loadState();
	const files = readdirSync(NEWS_DIR)
		.filter((f) => f.endsWith('.md'))
		.sort();
	if (files.length === 0) {
		console.log('nenhum post em content/news/');
		return;
	}

	let posted = 0;
	let failed = 0;
	const failures = [];

	for (const file of files) {
		const slug = file.replace(/\.md$/, '');
		if (state[slug]) continue;

		const { attributes, body } = fm(readFileSync(join(NEWS_DIR, file), 'utf8'));
		if (!attributes.date || !attributes.title) continue;

		const { title, summary = '', tags = [] } = attributes;
		console.log(`[${slug}] sindicando...`);
		if (DRY_RUN) {
			console.log(
				`  dev.to: título="${title}" tags=[${tags.slice(0, 4)}] body=${body.length} chars`
			);
			console.log(`  bsky: "${title}" - ${summary}`);
			continue;
		}

		const entry = { ts: new Date().toISOString() };
		try {
			entry.devtoId = await postDevto({ slug, title, body, description: summary, tags });
			console.log(`  dev.to ok (#${entry.devtoId})`);
		} catch (e) {
			failed++;
			failures.push(`  dev.to: ${e.message}`);
		}
		try {
			entry.bskyUri = await postBluesky({ slug, title, summary });
			console.log(`  bsky ok (${entry.bskyUri})`);
		} catch (e) {
			failed++;
			failures.push(`  bsky: ${e.message}`);
		}

		/* Registra o que publicou mesmo que parte tenha falhado - re-run retoma o resto. */
		if (entry.devtoId || entry.bskyUri) {
			state[slug] = entry;
			posted++;
		}
	}

	if (posted > 0) await saveState(state);
	console.log(`sindicados: ${posted} post(s)`);
	if (failed > 0) {
		console.error(`falhas (${failed}):`);
		for (const f of failures) console.error(f);
		process.exit(1);
	}
}

await main();
