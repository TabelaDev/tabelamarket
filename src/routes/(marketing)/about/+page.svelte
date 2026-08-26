<script lang="ts">
	import { Page, Prose } from '@tabeladev/tabelawebui';
	import UserRoundIcon from '@lucide/svelte/icons/user-round';
	import HeartHandshakeIcon from '@lucide/svelte/icons/heart-handshake';
	import BookUserIcon from '@lucide/svelte/icons/book-user';
	import AboutMd from '../../../../content/about.md';

	const TITLE = 'Sobre - TabelaMarket';
	const DESCRIPTION = 'Sobre a TabelaDev e eu, Ian Soares, o desenvolvedor por trás.';
</script>

<Page.Seo siteName="TabelaMarket" title={TITLE} description={DESCRIPTION} />

<Page>
	<Page.Header
		title="Quem está por trás da TabelaDev"
		subtitle="Um dev, alguns TUIs, alguns apps web - e a mesma obsessão em todo projeto."
		back={{ label: 'Início', href: '/' }}
	/>

	<Prose>
		<AboutMd />
	</Prose>

	<div class="flex flex-col gap-3 border-t border-rule pt-6">
		<div class="flex items-center gap-3">
			<UserRoundIcon class="size-4 text-accent-ink" />
			<span class="font-mono text-sm"
				>O dev por trás: <span class="text-accent-ink">ianptkcs</span></span
			>
		</div>
		<div class="flex items-center gap-3">
			<BookUserIcon class="size-4 text-accent-ink" />
			<span class="font-mono text-sm">Portfolio/CV:</span>
			<a
				href="https://portfolio-1vz.pages.dev/"
				target="_blank"
				rel="noreferrer"
				class="font-mono text-sm text-accent-ink underline decoration-accent underline-offset-4"
				>portfolio-1vz.pages.dev</a
			>
		</div>
		<div class="flex items-center gap-3">
			<HeartHandshakeIcon class="size-4 text-accent-ink" />
			<span class="font-mono text-sm">Gosta do projeto? Ko-fi:</span>
			<a
				href="https://ko-fi.com/ianptkcs"
				target="_blank"
				rel="noreferrer"
				class="font-mono text-sm text-accent-ink underline decoration-accent underline-offset-4"
				>ko-fi.com/ianptkcs</a
			>
		</div>
	</div>
</Page>
