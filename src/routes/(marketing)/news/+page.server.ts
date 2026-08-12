import { getAllNews } from '$lib/server/news';

export function load() {
	return { posts: getAllNews() };
}
