import { error } from '@sveltejs/kit';
import { getPhoto, getPhotos } from '$lib/sanity';

// Prerender 'auto': skip when entries() returns empty (no photos in Sanity yet)
// without erroring; once photos exist, build will discover them via /photography links.
export const prerender = 'auto';

export async function entries() {
	const photos = await getPhotos();
	return photos.map((photo) => ({ slug: photo.slug.current }));
}

export async function load({ params }) {
	const photo = await getPhoto(params.slug);
	if (!photo) {
		error(404, 'Photo not found');
	}
	return { photo };
}
