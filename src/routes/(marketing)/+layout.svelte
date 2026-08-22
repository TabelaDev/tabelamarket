<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { MarketingShell, Button } from '@tabeladev/tabelawebui';
	import { PUBLIC_TABELAHUB_URL, PUBLIC_APP_URL } from '$env/static/public';

	let { children } = $props();

	const navItems = [
		{ href: '/', label: 'Início' },
		{ href: '/news', label: 'News' },
		{ href: '/changelog', label: 'Changelog' },
		{ href: '/about', label: 'Sobre' }
	] as const;

	const currentPath = $derived(page.url.pathname);
</script>

<MarketingShell
	suffix="Market"
	footerLinks={[
		{ href: `${PUBLIC_TABELAHUB_URL}/privacidade`, label: 'Privacidade' },
		{ href: `${PUBLIC_TABELAHUB_URL}/termos`, label: 'Termos de uso' },
		{ href: 'https://github.com/TabelaDev/tabelamarket', label: 'Código-fonte' }
	]}
	footerLicense="AGPL-3.0 · SvelteKit + Cloudflare Workers"
>
	{#snippet header()}
		<nav class="flex items-center gap-4 font-mono text-sm">
			{#each navItems as item (item.href)}
				<a
					href={resolve(item.href)}
					class={currentPath === item.href
						? 'text-accent-ink underline decoration-accent underline-offset-4'
						: 'text-ink-soft hover:text-ink'}
				>
					{item.label}
				</a>
			{/each}
		</nav>
	{/snippet}
	{#snippet actions()}
		<Button
			href="{PUBLIC_TABELAHUB_URL}/login?redirect={encodeURIComponent(PUBLIC_APP_URL)}"
			variant="ghost"
			size="sm">Entrar</Button
		>
	{/snippet}
	{@render children()}
</MarketingShell>
