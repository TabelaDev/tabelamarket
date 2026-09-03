<script lang="ts">
	import { changelog } from '$lib/hub-data';
	import { Page, Timeline } from '@tabelhadev/tabelhawebui';

	const TITLE = 'Changelog - TAbelhaHub';
	const DESCRIPTION =
		'Histórico de releases de todos os repos públicos da TAbelhaDev, agregado automaticamente a partir dos CHANGELOG.md e das GitHub Releases.';

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
		link: `https://github.com/TAbelhaDev/${e.repo}/releases`,
		details: e.body
			.split('\n')
			.map(cleanLine)
			.filter((l) => l.length > 0)
			.slice(0, 4)
	}));
</script>

<Page.Seo siteName="TAbelhaHub" title={TITLE} description={DESCRIPTION} />

<Page>
	<Page.Header
		title="As releases, num lugar só"
		subtitle="Agregado automaticamente: quando um repo corta release (e mantém o CHANGELOG.md), a próxima build já traz aqui."
		back={{ label: 'Início', href: '/' }}
	/>

	<Timeline {items} />
</Page>
