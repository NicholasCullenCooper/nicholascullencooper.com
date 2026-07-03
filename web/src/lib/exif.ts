import type { SanityExif } from './sanity';

export type FormattedExif = {
	camera?: string;
	lens?: string;
	iso?: string;
	aperture?: string;
	shutter?: string;
	focalLength?: string;
	dateTaken?: Date;
};

export function formatExif(exif: SanityExif | undefined): FormattedExif {
	if (!exif) return {};

	const camera = joinTrim([exif.Make, exif.Model]);
	const lens = exif.LensModel ?? exif.LensInfo;

	const iso = exif.ISO !== undefined ? `ISO ${exif.ISO}` : undefined;
	const aperture = exif.FNumber !== undefined ? `f/${roundClean(exif.FNumber, 1)}` : undefined;
	const shutter = formatShutter(exif.ExposureTime);
	const focalLength =
		exif.FocalLength !== undefined ? `${roundClean(exif.FocalLength, 0)}mm` : undefined;
	const dateTaken = exif.DateTimeOriginal ? new Date(exif.DateTimeOriginal) : undefined;

	return { camera, lens, iso, aperture, shutter, focalLength, dateTaken };
}

function joinTrim(parts: Array<string | undefined>): string | undefined {
	const filtered = parts.filter((p): p is string => Boolean(p && p.trim()));
	if (filtered.length === 0) return undefined;
	// Dedupe: many cameras report "FUJIFILM" then "FUJIFILM X-T5".
	return filtered.reduce<string>((acc, part) => {
		if (!acc) return part;
		if (part.toLowerCase().includes(acc.toLowerCase())) return part;
		if (acc.toLowerCase().includes(part.toLowerCase())) return acc;
		return `${acc} ${part}`;
	}, '');
}

function roundClean(value: number, decimals: number): string {
	const factor = 10 ** decimals;
	const rounded = Math.round(value * factor) / factor;
	return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(decimals);
}

function formatShutter(exposureTime: number | undefined): string | undefined {
	if (exposureTime === undefined) return undefined;
	if (exposureTime >= 1) return `${roundClean(exposureTime, 1)}s`;
	const denom = Math.round(1 / exposureTime);
	return `1/${denom}`;
}
