import { getNotes } from '$lib/content/notes';

export const prerender = true;

export function load() {
	const notes = getNotes().map((n) => ({
		title: n.title,
		slug: n.slug,
		created: n.created.toISOString(),
		updated: n.updated?.toISOString(),
		excerpt: n.excerpt,
		tags: n.tags
	}));
	return { notes };
}
