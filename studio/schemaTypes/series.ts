import { defineField, defineType } from 'sanity';

export const series = defineType({
	name: 'series',
	title: 'Series',
	type: 'document',
	description: 'A grouping of photographs by subject, place, or theme.',
	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: { source: 'title', maxLength: 96 },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 4
		}),
		defineField({
			name: 'coverPhoto',
			type: 'reference',
			to: [{ type: 'photo' }],
			description: 'The photo to feature when this series appears in indexes.'
		}),
		defineField({
			name: 'startedAt',
			title: 'Started',
			type: 'date'
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'description',
			media: 'coverPhoto.image'
		}
	}
});
