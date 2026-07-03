import { z } from 'zod';
import type { Component } from 'svelte';

export const essayFrontmatterSchema = z.object({
	title: z.string(),
	date: z.coerce.date(),
	slug: z.string(),
	excerpt: z.string().optional(),
	tags: z.array(z.string()).default([]),
	draft: z.boolean().default(false)
});

export type EssayFrontmatter = z.infer<typeof essayFrontmatterSchema>;

export type Essay = EssayFrontmatter & {
	path: string;
	component: Component;
};

type MdsvexModule = {
	default: Component;
	metadata: Record<string, unknown>;
};

const modules = import.meta.glob<MdsvexModule>('/src/content/writing/*.md', { eager: true });

function parse(path: string, mod: MdsvexModule): Essay {
	const result = essayFrontmatterSchema.safeParse(mod.metadata);
	if (!result.success) {
		throw new Error(
			`Invalid frontmatter in ${path}: ${result.error.issues.map((i) => i.message).join(', ')}`
		);
	}
	return { ...result.data, path, component: mod.default };
}

const all: Essay[] = Object.entries(modules)
	.map(([path, mod]) => parse(path, mod))
	.filter((essay) => import.meta.env.DEV || !essay.draft)
	.toSorted((a, b) => b.date.getTime() - a.date.getTime());

export function getEssays(): Essay[] {
	return all;
}

export function getEssay(slug: string): Essay | undefined {
	return all.find((essay) => essay.slug === slug);
}

export function getEssaySlugs(): string[] {
	return all.map((essay) => essay.slug);
}
