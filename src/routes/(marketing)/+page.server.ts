import { getAllNews } from '$lib/server/news';

export function load() {
	const news = getAllNews();
	return {
		newsHead: news
			.slice(0, 3)
			.map(({ slug, title, date, summary }) => ({ slug, title, date, summary }))
	};
}
