import { z } from 'zod';
import type { Component } from 'svelte';

export const noteFrontmatterSchema = z.object({
	title: z.string(),
	slug: z.string(),
	created: z.coerce.date(),
	updated: z.coerce.date().optional(),
	tags: z.array(z.string()).default([]),
	related: z.array(z.string()).default([]),
	excerpt: z.string().optional(),
	draft: z.boolean().default(false)
});

export type NoteFrontmatter = z.infer<typeof noteFrontmatterSchema>;

export type Note = NoteFrontmatter & {
	path: string;
	component: Component;
};

type MdsvexModule = {
	default: Component;
	metadata: Record<string, unknown>;
};

const modules = import.meta.glob<MdsvexModule>('/src/content/notes/*.md', { eager: true });

function parse(path: string, mod: MdsvexModule): Note {
	const result = noteFrontmatterSchema.safeParse(mod.metadata);
	if (!result.success) {
		throw new Error(
			`Invalid frontmatter in ${path}: ${result.error.issues.map((i) => i.message).join(', ')}`
		);
	}
	return { ...result.data, path, component: mod.default };
}

const all: Note[] = Object.entries(modules)
	.map(([path, mod]) => parse(path, mod))
	.filter((note) => import.meta.env.DEV || !note.draft)
	.toSorted((a, b) => {
		const aDate = a.updated ?? a.created;
		const bDate = b.updated ?? b.created;
		return bDate.getTime() - aDate.getTime();
	});

export function getNotes(): Note[] {
	return all;
}

export function getNote(slug: string): Note | undefined {
	return all.find((note) => note.slug === slug);
}

export function getNoteSlugs(): string[] {
	return all.map((note) => note.slug);
}
