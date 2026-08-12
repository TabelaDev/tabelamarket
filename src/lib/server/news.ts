import fm from 'front-matter';
import { marked } from 'marked';

export interface NewsPost {
	slug: string;
	title: string;
	date: string;
	summary: string;
	tags: string[];
	featured: boolean;
	html: string;
}

interface PostMeta {
	title?: string;
	date?: string;
	summary?: string;
	tags?: string[];
	featured?: boolean;
}

const modules = import.meta.glob('../../../content/news/*.md', {
	query: '?raw',
	import: 'default',
	eager: true
});

function parsePost(slug: string, raw: string): NewsPost | null {
	const { attributes, body } = fm(raw) as { attributes: PostMeta; body: string };
	if (!attributes.date || !attributes.title) return null;
	return {
		slug,
		title: attributes.title,
		date: attributes.date,
		summary: attributes.summary || '',
		tags: attributes.tags || [],
		featured: attributes.featured || false,
		html: marked.parse(body, { async: false })
	};
}

const posts: NewsPost[] = Object.entries(modules)
	.map(([path, raw]) => {
		const slug = path.split('/').pop()?.replace(/\.md$/, '');
		return slug ? parsePost(slug, raw as string) : null;
	})
	.filter((p): p is NewsPost => p !== null)
	.sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllNews(): NewsPost[] {
	return posts;
}

export function getNewsBySlug(slug: string): NewsPost | null {
	return posts.find((p) => p.slug === slug) ?? null;
}
