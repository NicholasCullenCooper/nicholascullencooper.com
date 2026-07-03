import { defineField, defineType } from 'sanity';

export const photo = defineType({
	name: 'photo',
	title: 'Photo',
	type: 'document',
	description:
		'A single photograph. Camera, lens, ISO, aperture, shutter, focal length, and dimensions are extracted from the file automatically — no need to fill them in.',
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
			name: 'image',
			type: 'image',
			options: { hotspot: true, metadata: ['exif', 'lqip', 'palette', 'blurhash', 'location'] },
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'alt',
			title: 'Alt text',
			type: 'string',
			description: 'Required for accessibility. Describe what is in the photograph.',
			validation: (Rule) => Rule.required().max(200)
		}),
		defineField({
			name: 'caption',
			type: 'text',
			rows: 3,
			description: 'Optional. Short editorial caption shown beneath the plate.'
		}),
		defineField({
			name: 'date',
			title: 'Date taken (override)',
			type: 'date',
			description:
				'Optional. Falls back to the EXIF DateTimeOriginal on the image. Set this only if the EXIF date is wrong or missing.'
		}),
		defineField({
			name: 'location',
			type: 'string',
			description:
				'Optional. e.g., "Kyoto, Japan". Some images have GPS in EXIF; this is the human label.'
		}),
		defineField({
			name: 'series',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'series' }] }]
		}),
		defineField({
			name: 'exhibitions',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'exhibition' }] }]
		})
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'location',
			media: 'image'
		}
	},
	orderings: [
		{
			title: 'Date taken, newest first',
			name: 'dateDesc',
			by: [{ field: 'date', direction: 'desc' }]
		}
	]
});
