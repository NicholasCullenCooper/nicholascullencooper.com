import { defineField, defineType } from 'sanity';

export const exhibition = defineType({
	name: 'exhibition',
	title: 'Exhibition',
	type: 'document',
	description: 'A curated photo collection with editorial text.',
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
			name: 'year',
			type: 'number',
			validation: (Rule) => Rule.required().min(1900).max(2100)
		}),
		defineField({
			name: 'curatorialText',
			title: 'Curatorial text',
			type: 'array',
			of: [{ type: 'block' }],
			description: 'Portable Text. The curator/editor note that accompanies the exhibition.'
		}),
		defineField({
			name: 'coverPhoto',
			type: 'reference',
			to: [{ type: 'photo' }]
		}),
		defineField({
			name: 'photos',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'photo' }] }],
			description: 'Ordered. Drag to reorder; the order here is the order shown.'
		})
	],
	orderings: [
		{
			title: 'Year, newest first',
			name: 'yearDesc',
			by: [{ field: 'year', direction: 'desc' }]
		}
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'year',
			media: 'coverPhoto.image'
		}
	}
});
