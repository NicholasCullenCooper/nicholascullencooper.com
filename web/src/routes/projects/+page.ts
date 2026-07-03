import { getProjects } from '$lib/content/projects';

export const prerender = true;

export function load() {
	const projects = getProjects().map((p) => ({
		title: p.title,
		slug: p.slug,
		status: p.status,
		startedAt: p.startedAt.toISOString(),
		endedAt: p.endedAt?.toISOString(),
		excerpt: p.excerpt,
		role: p.role,
		tech: p.tech,
		links: p.links
	}));
	return { projects };
}
