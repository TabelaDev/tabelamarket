import { getAllNews } from '$lib/server/news';
import { projects } from '$lib/hub-data';

export function load() {
	return { posts: getAllNews(), projects };
}
