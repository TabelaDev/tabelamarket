<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import { Badge, Button, Page } from '@tabelhadev/tabelhawebui';
	import NewsItem from '$lib/components/news/NewsItem.svelte';
	import ExternalLinkIcon from '@lucide/svelte/icons/external-link';
	import GitForkIcon from '@lucide/svelte/icons/git-fork';

	let { data } = $props<{ data: PageData }>();

	const project = $derived(data.project);
	const posts = $derived(data.posts);

	const TITLE = $derived(`${project.name} - TabelaHub`);
	const DESCRIPTION = $derived(project.tagline);

	const kindLabel: Record<string, string> = {
		web: 'web',
		tui: 'tui',
		os: 'os',
		lib: 'lib'
	};
</script>

<Page.Seo siteName="TabelaHub" title={TITLE} description={DESCRIPTION} />

<Page>
	<Page.Header
		title={project.name}
		subtitle={project.tagline}
		back={{ label: 'News', href: '/news' }}
	/>

	<div class="flex flex-wrap items-center gap-2">
		<span class="size-2 rounded-full" style="background: {project.accent}"></span>
		<Badge>{kindLabel[project.kind]}</Badge>
		{#if project.language}
			<Badge>{project.language}</Badge>
		{/if}
		{#if project.links.npm}
			<Badge>npm</Badge>
		{/if}
		<div class="flex items-center gap-2">
			{#if project.links.npm}
				<Button
					href={project.links.npm}
					target="_blank"
					rel="external noreferrer"
					variant="outline"
					size="sm"
				>
					<ExternalLinkIcon class="size-4" />
					npm
				</Button>
			{/if}
			<Button
				href={project.html_url}
				target="_blank"
				rel="external noreferrer"
				variant="outline"
				size="sm"
			>
				<GitForkIcon class="size-4" />
				GitHub
			</Button>
		</div>
	</div>

	{#if posts.length > 0}
		<div class="flex flex-col divide-y divide-rule">
			{#each posts as post (post.slug)}
				<NewsItem
					title={post.title}
					date={post.date}
					summary={post.summary}
					tags={post.tags}
					href={resolve(`/news/${post.slug}`)}
				/>
			{/each}
		</div>
	{:else}
		<p class="font-serif text-sm text-ink-soft">Nenhum post ainda sobre este projeto.</p>
	{/if}
</Page>
