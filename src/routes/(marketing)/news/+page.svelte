<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import { Button, SectionHeading } from '@tabeladev/tabelawebui';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';

	let { data } = $props<{ data: PageData }>();

	const TITLE = 'News — TabelaMarket';
	const DESCRIPTION =
		'O que estou fazendo e pensando: notas sobre decisões de design e o porquê das coisas.';
	const canonical = $derived(`${page.url.origin}${page.url.pathname}`);
</script>

<svelte:head>
	<title>{TITLE}</title>
	<meta name="description" content={DESCRIPTION} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="TabelaMarket" />
	<meta property="og:locale" content="pt_BR" />
	<meta property="og:title" content={TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
</svelte:head>

<div class="flex w-full flex-col gap-12 px-6 pt-14 pb-8">
	<div>
		<Button href="/" variant="ghost" size="sm" class="mb-6 -ml-2">
			<ArrowLeftIcon class="size-4" />
			Início
		</Button>
		<SectionHeading
			eyebrow="News"
			title="O que estou fazendo e pensando."
			lead="Notas curtas, sem data de publicação forçada. O changelog fica em /changelog."
		/>
	</div>

	<div class="flex flex-col divide-y divide-rule">
		{#each data.posts as post (post.slug)}
			<a href={resolve(`/news/${post.slug}`)} class="group flex flex-col gap-1 py-5">
				<div class="flex items-baseline gap-3">
					<span class="font-mono text-xs text-ink-faint">{post.date}</span>
					{#if post.tags.length > 0}
						{#each post.tags as tag (tag)}
							<span class="font-mono text-xs text-accent-ink">[{tag}]</span>
						{/each}
					{/if}
				</div>
				<span class="mt-1 font-mono text-base group-hover:text-accent-ink">{post.title}</span>
				<span class="mt-1 font-serif text-sm text-ink-soft">{post.summary}</span>
			</a>
		{/each}
	</div>
</div>
