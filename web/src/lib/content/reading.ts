import { z } from 'zod';

export const readingSourceEnum = z.enum(['book', 'article', 'paper', 'podcast', 'video', 'other']);

export const readingFrontmatterSchema = z.object({
	title: z.string(),
	url: z.string().url(),
	addedAt: z.coerce.date(),
	author: z.string().optional(),
	source: readingSourceEnum.default('article'),
	tags: z.array(z.string()).default([]),
	note: z.string().optional()
});

export type ReadingFrontmatter = z.infer<typeof readingFrontmatterSchema>;
export type ReadingSource = z.infer<typeof readingSourceEnum>;

export type ReadingItem = ReadingFrontmatter & {
	slug: string;
	path: string;
};

type MdsvexModule = {
	metadata: Record<string, unknown>;
};

const modules = import.meta.glob<MdsvexModule>('/src/content/reading/*.md', { eager: true });

function slugFromPath(path: string): string {
	const file = path.split('/').pop() ?? '';
	return file.replace(/\.md$/, '');
}

function parse(path: string, mod: MdsvexModule): ReadingItem {
	const result = readingFrontmatterSchema.safeParse(mod.metadata);
	if (!result.success) {
		throw new Error(
			`Invalid frontmatter in ${path}: ${result.error.issues.map((i) => i.message).join(', ')}`
		);
	}
	return { ...result.data, slug: slugFromPath(path), path };
}

const all: ReadingItem[] = Object.entries(modules)
	.map(([path, mod]) => parse(path, mod))
	.toSorted((a, b) => b.addedAt.getTime() - a.addedAt.getTime());

export function getReadingItems(): ReadingItem[] {
	return all;
}
