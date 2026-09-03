<script lang="ts">
	import { Badge } from '@tabelhadev/tabelhawebui';
	import { friendlyDate } from '$lib/date';

	let {
		title,
		date,
		summary,
		tags = [],
		href
	}: {
		title: string;
		date: string;
		summary: string;
		tags?: string[];
		href: string;
	} = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a {href} class="group flex flex-col gap-1 py-5">
	<div class="flex items-baseline gap-3">
		<Badge variant="secondary">{friendlyDate(date)}</Badge>
		{#each tags as tag (tag)}
			<Badge>{tag}</Badge>
		{/each}
	</div>
	<span class="mt-1 font-mono text-base group-hover:text-accent-ink">{title}</span>
	<span class="mt-1 font-serif text-sm text-ink-soft">{summary}</span>
</a>
