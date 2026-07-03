import { error } from '@sveltejs/kit';
import { getProject, getProjectSlugs } from '$lib/content/projects';

export const prerender = 'auto';

export function entries() {
	return getProjectSlugs().map((slug) => ({ slug }));
}

export function load({ params }) {
	const project = getProject(params.slug);
	if (!project) {
		error(404, 'Project not found');
	}
	return {
		title: project.title,
		slug: project.slug,
		status: project.status,
		startedAt: project.startedAt.toISOString(),
		endedAt: project.endedAt?.toISOString(),
		excerpt: project.excerpt,
		role: project.role,
		tech: project.tech,
		links: project.links
	};
}
