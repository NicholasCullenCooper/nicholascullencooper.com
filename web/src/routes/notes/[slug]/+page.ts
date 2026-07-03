import { error } from '@sveltejs/kit';
import { getNote, getNoteSlugs } from '$lib/content/notes';

export const prerender = 'auto';

export function entries() {
	return getNoteSlugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	const note = getNote(params.slug);
	if (!note) {
		error(404, 'Note not found');
	}
	return {
		title: note.title,
		slug: note.slug,
		created: note.created.toISOString(),
		updated: note.updated?.toISOString(),
		excerpt: note.excerpt,
		tags: note.tags,
		related: note.related
	};
}
