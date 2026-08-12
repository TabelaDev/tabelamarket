import { error } from '@sveltejs/kit';
import { getNewsBySlug } from '$lib/server/news';

export function load({ params }) {
	const post = getNewsBySlug(params.slug);
	if (!post) error(404, 'Post não encontrado');
	return { post };
}
