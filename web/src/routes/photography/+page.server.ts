import { getPhotos } from '$lib/sanity';

export const prerender = true;

export async function load() {
	const photos = await getPhotos();
	return { photos };
}
