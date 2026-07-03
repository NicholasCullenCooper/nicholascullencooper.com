import { getExhibitionsList } from '$lib/sanity';

export const prerender = true;

export async function load() {
	const exhibitions = await getExhibitionsList();
	return { exhibitions };
}
