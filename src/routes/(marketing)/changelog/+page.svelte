<script lang="ts">
	import { page } from '$app/state';
	import { changelog } from '$lib/hub-data';
	import { Button, SectionHeading, Timeline } from '@tabeladev/tabelawebui';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	const TITLE = 'Changelog — TabelaHub';
	const DESCRIPTION =
		'Histórico de releases de todos os repos públicos da TabelaDev, agregado automaticamente a partir dos CHANGELOG.md e das GitHub Releases.';
	const canonical = $derived(`${page.url.origin}${page.url.pathname}`);

	function cleanLine(line: string): string {
		return line
			.replace(/^\s*[-*]\s+/, '')
			.replace(/^#{1,6}\s+/, '')
			.replace(/^`([^`]*)`\s*/, '')
			.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
			.replace(/`/g, '')
			.trim();
	}

	const items: Timeline.ItemProps[] = changelog.map((e) => ({
		title: `${e.repo} ${e.version}`,
		subtitle: e.source === 'release' ? 'release' : 'changelog',
		date: e.date,
		link: `https://github.com/TabelaDev/${e.repo}/releases`,
		details: e.body
			.split('\n')
			.map(cleanLine)
			.filter((l) => l.length > 0)
			.slice(0, 4)
	}));
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="TabelaHub" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
</svelte:head>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-10 px-6 pt-14 pb-8">
	<Button href="/" variant="ghost" size="sm" class="-ml-2">
		<ArrowLeftIcon class="size-4" />
		Início
	</Button>

	<SectionHeading
		eyebrow="Changelog"
		title="As releases, num lugar só."
		lead="Agregado automaticamente: quando um repo corta release (e mantém o CHANGELOG.md), a próxima build do hub já traz aqui. Sem registro manual."
	/>

	<Timeline {items} />
</div>
