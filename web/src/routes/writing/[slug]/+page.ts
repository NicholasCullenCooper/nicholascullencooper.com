import { error } from '@sveltejs/kit';
import { getEssay, getEssaySlugs } from '$lib/content/writing';

export const prerender = true;

export function entries() {
	return getEssaySlugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	const essay = getEssay(params.slug);
	if (!essay) {
		error(404, 'Essay not found');
	}
	return {
		title: essay.title,
		slug: essay.slug,
		date: essay.date.toISOString(),
		excerpt: essay.excerpt,
		tags: essay.tags
	};
}
