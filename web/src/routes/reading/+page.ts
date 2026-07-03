import { getReadingItems } from '$lib/content/reading';

export const prerender = true;

export function load() {
	const items = getReadingItems().map((i) => ({
		slug: i.slug,
		title: i.title,
		url: i.url,
		addedAt: i.addedAt.toISOString(),
		author: i.author,
		source: i.source,
		tags: i.tags,
		note: i.note
	}));
	return { items };
}
