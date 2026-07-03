import { z } from 'zod';
import type { Component } from 'svelte';

export const pageFrontmatterSchema = z.object({
	title: z.string(),
	updated: z.coerce.date().optional(),
	description: z.string().optional()
});

export type PageFrontmatter = z.infer<typeof pageFrontmatterSchema>;

export type Page = PageFrontmatter & {
	slug: string;
	path: string;
	component: Component;
};

type MdsvexModule = {
	default: Component;
	metadata: Record<string, unknown>;
};

const modules = import.meta.glob<MdsvexModule>('/src/content/pages/*.md', { eager: true });

function slugFromPath(path: string): string {
	const file = path.split('/').pop() ?? '';
	return file.replace(/\.md$/, '');
}

function parse(path: string, mod: MdsvexModule): Page {
	const result = pageFrontmatterSchema.safeParse(mod.metadata);
	if (!result.success) {
		throw new Error(
			`Invalid frontmatter in ${path}: ${result.error.issues.map((i) => i.message).join(', ')}`
		);
	}
	return { ...result.data, slug: slugFromPath(path), path, component: mod.default };
}

const all: Page[] = Object.entries(modules).map(([path, mod]) => parse(path, mod));

export function getPage(slug: string): Page | undefined {
	return all.find((page) => page.slug === slug);
}
