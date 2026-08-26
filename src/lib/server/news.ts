export interface NewsPost {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
	featured: boolean;
}

interface PostMeta {
	title?: string;
	date?: string;
	summary?: string;
	tags?: string[];
	featured?: boolean;
}

interface MdModule {
	default: unknown;
	metadata: PostMeta;
}

const modules = import.meta.glob('../../../content/news/*.md', { eager: true });

const posts: NewsPost[] = Object.entries(modules)
	.map(([path, mod]) => {
		const slug = path.split('/').pop()?.replace(/\.md$/, '');
		const { metadata } = mod as MdModule;
		if (!slug || !metadata.date || !metadata.title) return null;
		return {
			slug,
			title: metadata.title,
			date: metadata.date,
			summary: metadata.summary || '',
			tags: metadata.tags || [],
			featured: metadata.featured || false
		};
	})
	.filter((p): p is NewsPost => p !== null)
	.sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllNews(): NewsPost[] {
	return posts;
}

export function getNewsBySlug(slug: string): NewsPost | null {
	return posts.find((p) => p.slug === slug) ?? null;
}

export function getNewsByTag(tag: string): NewsPost[] {
	return posts.filter((p) => p.tags.includes(tag));
}

export function getAllTags(): string[] {
	const tagSet = new Set<string>();
	for (const post of posts) for (const tag of post.tags) tagSet.add(tag);
	return [...tagSet].sort();
}
