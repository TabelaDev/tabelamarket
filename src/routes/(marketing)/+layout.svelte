<script lang="ts">
	import { MarketingShell, Button } from '@tabeladev/tabelawebui';
	import { PUBLIC_TABELAHUB_URL, PUBLIC_APP_URL } from '$env/static/public';

	let { children } = $props();

	const navItems = [
		{ href: '/', label: 'Início' },
		{ href: '/news', label: 'News' },
		{ href: '/changelog', label: 'Changelog' },
		{ href: '/about', label: 'Sobre' }
	];
</script>

<MarketingShell
	suffix="Market"
	nav={navItems}
	footerLinks={[
		{ href: `${PUBLIC_TABELAHUB_URL}/privacidade`, label: 'Privacidade' },
		{ href: `${PUBLIC_TABELAHUB_URL}/termos`, label: 'Termos de uso' },
		{ href: 'https://github.com/TabelaDev/tabelamarket', label: 'Código-fonte' }
	]}
	footerLicense="AGPL-3.0 · SvelteKit + Cloudflare Workers"
>
	{#snippet actions()}
		<Button
			href="{PUBLIC_TABELAHUB_URL}/login?redirect={encodeURIComponent(PUBLIC_APP_URL)}"
			variant="ghost"
			size="sm">Entrar</Button
		>
	{/snippet}
	{@render children()}
</MarketingShell>
