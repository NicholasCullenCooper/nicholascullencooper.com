import { getSeriesList } from '$lib/sanity';

export const prerender = true;

export async function load() {
	const series = await getSeriesList();
	return { series };
}
