<script lang="ts">
	import { page } from '$app/state';
	import type { PageData } from './$types';
	import { Button } from '@tabeladev/tabelawebui';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	let { data } = $props<{ data: PageData }>();

	const post = $derived(data.post);
	const TITLE = $derived(`${post.title} — TabelaHub`);
	const DESCRIPTION = $derived(post.summary);
	const canonical = $derived(`${page.url.origin}${page.url.pathname}`);
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="article" />
	<meta property="og:site_name" content="TabelaHub" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
</svelte:head>

<div class="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 pt-14 pb-8">
	<Button href="/news" variant="ghost" size="sm" class="-ml-2">
		<ArrowLeftIcon class="size-4" />
		News
	</Button>

	<header class="flex flex-col gap-3">
		<div class="flex items-baseline gap-3 font-mono text-xs text-ink-faint">
			<span>{post.date}</span>
			{#each post.tags as tag (tag)}
				<span class="text-accent-ink">[{tag}]</span>
			{/each}
		</div>
		<h1 class="font-serif text-3xl leading-tight">{post.title}</h1>
	</header>

	<article
		class="prose prose-tabela dark:prose-invert max-w-none font-serif text-[1.05rem] leading-relaxed"
	>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -- markdown autoral renderizado server-side -->
		{@html post.html}
	</article>
</div>
