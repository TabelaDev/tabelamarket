<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Component } from 'svelte';
	import type { PageData } from './$types';
	import { Badge, Page, Prose } from '@tabelhadev/tabelhawebui';
	import { projects, type Project } from '$lib/hub-data';
	import { friendlyDate } from '$lib/date';

	let { data } = $props<{ data: PageData }>();

	const post = $derived(data.post);
	const TITLE = $derived(`${post.title} - TabelaHub`);
	const DESCRIPTION = $derived(post.summary);

	const projectNames = new Set(projects.map((p: Project) => p.name));

	interface MdModule {
		default: Component;
		metadata: Record<string, unknown>;
	}

	const modules = import.meta.glob('../../../../../content/news/*.md', {
		eager: true
	}) as Record<string, MdModule>;

	const Post = $derived(modules[`../../../../../content/news/${post.slug}.md`]?.default ?? null);
</script>

<Page.Seo siteName="TabelaHub" title={TITLE} description={DESCRIPTION} type="article" />

<Page>
	<Page.Header title={post.title} back={{ label: 'News', href: '/news' }}>
		{#snippet subtitle()}
			<span class="flex flex-wrap items-center gap-2">
				<Badge variant="secondary">{friendlyDate(post.date)}</Badge>
				{#each post.tags as tag (tag)}
					{#if projectNames.has(tag)}
						<a href={resolve(`/news/tag/${tag}`)}>
							<Badge>{tag}</Badge>
						</a>
					{:else}
						<Badge>{tag}</Badge>
					{/if}
				{/each}
			</span>
		{/snippet}
	</Page.Header>

	{#if Post}
		<Prose>
			<Post />
		</Prose>
	{/if}
</Page>
