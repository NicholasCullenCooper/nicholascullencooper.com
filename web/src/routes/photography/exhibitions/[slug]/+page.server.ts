import { error } from '@sveltejs/kit';
import { getExhibition, getExhibitionsList } from '$lib/sanity';

export const prerender = 'auto';

export async function entries() {
	const list = await getExhibitionsList();
	return list.map((e) => ({ slug: e.slug.current }));
}

export async function load({ params }) {
	const exhibition = await getExhibition(params.slug);
	if (!exhibition) {
		error(404, 'Exhibition not found');
	}
	return { exhibition };
}
