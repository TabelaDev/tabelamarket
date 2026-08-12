<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { ThemeToggle } from '@tabeladev/tabelawebui';

	let { children } = $props();

	const navItems = [
		{ href: '/', label: 'Início' },
		{ href: '/news', label: 'News' },
		{ href: '/changelog', label: 'Changelog' },
		{ href: '/about', label: 'Sobre' }
	] as const;

	const currentPath = $derived(page.url.pathname);
</script>

<div class="mx-auto flex min-h-svh w-full max-w-5xl flex-col border-x border-rule">
	<header class="sticky top-0 z-40 border-b border-rule bg-paper/60 backdrop-blur-sm">
		<div class="flex h-14 items-center justify-between gap-4 px-6">
			<a href={resolve('/')} class="font-mono text-sm font-semibold tracking-tight">
				tabela<span class="text-accent">hub</span>
			</a>
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
				<ThemeToggle />
			</nav>
		</div>
	</header>
	<main class="flex flex-1 flex-col">
		{@render children()}
	</main>
</div>
