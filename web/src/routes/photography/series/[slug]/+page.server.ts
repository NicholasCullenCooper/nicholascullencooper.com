import { error } from '@sveltejs/kit';
import { getSeries, getSeriesList } from '$lib/sanity';

export const prerender = 'auto';

export async function entries() {
	const list = await getSeriesList();
	return list.map((s) => ({ slug: s.slug.current }));
}

export async function load({ params }) {
	const series = await getSeries(params.slug);
	if (!series) {
		error(404, 'Series not found');
	}
	return { series };
}
