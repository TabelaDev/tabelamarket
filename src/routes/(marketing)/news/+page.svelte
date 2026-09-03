<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageData } from './$types';
	import { Badge, Page } from '@tabelhadev/tabelhawebui';
	import type { Project } from '$lib/hub-data';
	import type { NewsPost } from '$lib/server/news';
	import NewsItem from '$lib/components/news/NewsItem.svelte';

	let { data } = $props<{ data: PageData }>();

	const TITLE = 'TAbelhaHub: News';
	const DESCRIPTION =
		'O que estou fazendo e pensando: notas sobre decisões de design e o porquê das coisas.';

	const tagsWithPosts = $derived(
		data.projects.filter((p: Project) =>
			data.posts.some((post: NewsPost) => post.tags.includes(p.name))
		)
	);
</script>

<Page.Seo siteName="TAbelhaHub" title={TITLE} description={DESCRIPTION} />

<Page>
	<Page.Header
		title="O que ando fazendo e pensando"
		subtitle="Alguns pensamentos, devaneios, desabafos... sem frequência fixa de publicação."
		back={{ label: 'Início', href: '/' }}
	/>

	<div class="flex flex-wrap gap-2">
		{#each tagsWithPosts as project (project.name)}
			<a href={resolve(`/news/tag/${project.name}`)}>
				<Badge variant="outline">{project.name}</Badge>
			</a>
		{/each}
	</div>

	<div class="flex flex-col divide-y divide-rule">
		{#each data.posts as post (post.slug)}
			<NewsItem
				title={post.title}
				date={post.date}
				summary={post.summary}
				tags={post.tags}
				href={resolve(`/news/${post.slug}`)}
			/>
		{/each}
	</div>
</Page>
