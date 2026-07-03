import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';
import type { PortableTextBlock } from '@portabletext/types';
import {
	PUBLIC_SANITY_PROJECT_ID,
	PUBLIC_SANITY_DATASET,
	PUBLIC_SANITY_API_VERSION
} from '$env/static/public';

type SanityImageSource = Parameters<ReturnType<typeof createImageUrlBuilder>['image']>[0];

export const sanity = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET,
	apiVersion: PUBLIC_SANITY_API_VERSION,
	useCdn: true,
	perspective: 'published'
});

const builder = createImageUrlBuilder(sanity);

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

export type SanityExif = {
	Make?: string;
	Model?: string;
	LensModel?: string;
	LensInfo?: string;
	FNumber?: number;
	ExposureTime?: number;
	ISO?: number;
	FocalLength?: number;
	FocalLengthIn35mmFormat?: number;
	DateTimeOriginal?: string;
	ExposureBiasValue?: number;
	Flash?: number;
};

export type SanityImage = {
	_type: 'image';
	asset: {
		_id: string;
		url: string;
		metadata: {
			dimensions: { width: number; height: number; aspectRatio: number };
			lqip?: string;
			exif?: SanityExif;
			palette?: {
				darkVibrant?: { background: string; foreground: string };
				lightVibrant?: { background: string; foreground: string };
				dominant?: { background: string; foreground: string };
			};
		};
	};
	hotspot?: { x: number; y: number; height: number; width: number };
	crop?: { top: number; right: number; bottom: number; left: number };
};

export type SanityPhoto = {
	_id: string;
	title: string;
	slug: { current: string };
	image: SanityImage;
	alt: string;
	caption?: string;
	date?: string;
	location?: string;
	series?: SanitySeriesRef[];
	exhibitions?: SanityExhibitionRef[];
};

export type SanitySeriesRef = { _id: string; title: string; slug: { current: string } };
export type SanityExhibitionRef = {
	_id: string;
	title: string;
	slug: { current: string };
	year?: number;
};

export type SanitySeriesSummary = SanitySeriesRef & {
	description?: string;
	startedAt?: string;
	coverPhoto?: SanityPhoto;
	photoCount: number;
};

export type SanitySeriesFull = SanitySeriesRef & {
	description?: string;
	startedAt?: string;
	coverPhoto?: SanityPhoto;
	photos: SanityPhoto[];
};

export type SanityExhibitionSummary = SanityExhibitionRef & {
	excerpt?: string;
	coverPhoto?: SanityPhoto;
	photoCount: number;
};

export type SanityExhibitionFull = SanityExhibitionRef & {
	curatorialText?: PortableTextBlock[];
	coverPhoto?: SanityPhoto;
	photos: SanityPhoto[];
};

const photoProjection = `
	_id, title, slug, alt, caption, date, location,
	image {
		...,
		asset->{
			_id, url,
			metadata {
				dimensions, lqip, palette,
				exif {
					Make, Model, LensModel, LensInfo,
					FNumber, ExposureTime, ISO, FocalLength, FocalLengthIn35mmFormat,
					DateTimeOriginal, ExposureBiasValue, Flash
				}
			}
		}
	},
	series[]->{_id, title, slug},
	exhibitions[]->{_id, title, slug, year}
`;

export async function getPhotos(): Promise<SanityPhoto[]> {
	return sanity.fetch(
		`*[_type == "photo"] | order(
			coalesce(date, image.asset->metadata.exif.DateTimeOriginal, _createdAt) desc
		) { ${photoProjection} }`
	);
}

export async function getPhoto(slug: string): Promise<SanityPhoto | null> {
	return sanity.fetch(`*[_type == "photo" && slug.current == $slug][0] { ${photoProjection} }`, {
		slug
	});
}

export async function getSeriesList(): Promise<SanitySeriesSummary[]> {
	return sanity.fetch(
		`*[_type == "series"] | order(startedAt desc, _createdAt desc) {
			_id, title, slug, description, startedAt,
			coverPhoto->{ ${photoProjection} },
			"photoCount": count(*[_type == "photo" && references(^._id)])
		}`
	);
}

export async function getSeries(slug: string): Promise<SanitySeriesFull | null> {
	return sanity.fetch(
		`*[_type == "series" && slug.current == $slug][0] {
			_id, title, slug, description, startedAt,
			coverPhoto->{ ${photoProjection} },
			"photos": *[_type == "photo" && references(^._id)]
				| order(coalesce(date, image.asset->metadata.exif.DateTimeOriginal, _createdAt) desc) {
				${photoProjection}
			}
		}`,
		{ slug }
	);
}

export async function getExhibitionsList(): Promise<SanityExhibitionSummary[]> {
	return sanity.fetch(
		`*[_type == "exhibition"] | order(year desc, _createdAt desc) {
			_id, title, slug, year,
			"excerpt": pt::text(curatorialText[0..1]),
			coverPhoto->{ ${photoProjection} },
			"photoCount": count(photos)
		}`
	);
}

export async function getExhibition(slug: string): Promise<SanityExhibitionFull | null> {
	return sanity.fetch(
		`*[_type == "exhibition" && slug.current == $slug][0] {
			_id, title, slug, year, curatorialText,
			coverPhoto->{ ${photoProjection} },
			"photos": photos[]->{ ${photoProjection} }
		}`,
		{ slug }
	);
}
