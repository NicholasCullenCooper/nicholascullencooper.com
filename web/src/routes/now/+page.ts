import { error } from '@sveltejs/kit';
import { getPage } from '$lib/content/pages';

export const prerender = true;

export function load() {
	const page = getPage('now');
	if (!page) {
		error(404, 'Page not found');
	}
	return {
		title: page.title,
		description: page.description,
		updated: page.updated?.toISOString()
	};
}
