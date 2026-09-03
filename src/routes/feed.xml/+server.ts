import { getAllNews } from '$lib/server/news';

const SITE = 'https://tabelahub.ianptkcs-023.workers.dev';

function esc(s: string): string {
	return s
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;');
}

export function GET() {
	const posts = getAllNews();
	const items = posts
		.map((p) => {
			const url = `${SITE}/news/${p.slug}`;
			return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <description>${esc(p.summary)}</description>
    </item>`;
		})
		.join('\n');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>TabelaHub - News</title>
    <link>${SITE}</link>
    <description>O que eu ando fazendo e pensando na TabelaDev.</description>
    <language>pt-BR</language>
    ${items}
  </channel>
</rss>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
