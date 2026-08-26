import { error } from '@sveltejs/kit';
import { getNewsByTag } from '$lib/server/news';
import { projects } from '$lib/hub-data';

export function load({ params }) {
	const project = projects.find((p) => p.name === params.tag);
	if (!project) error(404, { message: 'Projeto não encontrado' });

	const posts = getNewsByTag(params.tag);
	return { tag: params.tag, project, posts };
}
