import { getEssays } from '$lib/content/writing';

export const prerender = true;

export function load() {
	const essays = getEssays().map((e) => ({
		title: e.title,
		slug: e.slug,
		date: e.date.toISOString(),
		excerpt: e.excerpt
	}));
	return { essays };
}
