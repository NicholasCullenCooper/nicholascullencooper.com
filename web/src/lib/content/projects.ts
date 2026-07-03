import { z } from 'zod';
import type { Component } from 'svelte';

export const projectStatusEnum = z.enum(['active', 'completed', 'paused', 'abandoned']);

export const projectLinkSchema = z.object({
	label: z.string(),
	url: z.string().url()
});

export const projectFrontmatterSchema = z.object({
	title: z.string(),
	slug: z.string(),
	status: projectStatusEnum,
	startedAt: z.coerce.date(),
	endedAt: z.coerce.date().optional(),
	excerpt: z.string().optional(),
	role: z.string().optional(),
	tech: z.array(z.string()).default([]),
	links: z.array(projectLinkSchema).default([]),
	draft: z.boolean().default(false)
});

export type ProjectFrontmatter = z.infer<typeof projectFrontmatterSchema>;
export type ProjectStatus = z.infer<typeof projectStatusEnum>;

export type Project = ProjectFrontmatter & {
	path: string;
	component: Component;
};

type MdsvexModule = {
	default: Component;
	metadata: Record<string, unknown>;
};

const modules = import.meta.glob<MdsvexModule>('/src/content/projects/*.md', { eager: true });

function parse(path: string, mod: MdsvexModule): Project {
	const result = projectFrontmatterSchema.safeParse(mod.metadata);
	if (!result.success) {
		throw new Error(
			`Invalid frontmatter in ${path}: ${result.error.issues.map((i) => i.message).join(', ')}`
		);
	}
	return { ...result.data, path, component: mod.default };
}

const all: Project[] = Object.entries(modules)
	.map(([path, mod]) => parse(path, mod))
	.filter((project) => import.meta.env.DEV || !project.draft)
	.toSorted((a, b) => b.startedAt.getTime() - a.startedAt.getTime());

export function getProjects(): Project[] {
	return all;
}

export function getProject(slug: string): Project | undefined {
	return all.find((project) => project.slug === slug);
}

export function getProjectSlugs(): string[] {
	return all.map((project) => project.slug);
}
