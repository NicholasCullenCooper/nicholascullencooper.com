<script lang="ts">
	import { urlFor, type SanityImage } from './sanity';

	type Props = {
		image: SanityImage;
		alt: string;
		/** Sizes attribute for srcset. Default optimized for plate-stream layouts. */
		sizes?: string;
		/** Eager-load the first plate above the fold; lazy otherwise. */
		loading?: 'eager' | 'lazy';
		/** Render at intrinsic aspect ratio; default true. */
		intrinsic?: boolean;
	};

	let {
		image,
		alt,
		sizes = '(min-width: 1024px) 1024px, 100vw',
		loading = 'lazy',
		intrinsic = true
	}: Props = $props();

	// Widths covering common breakpoints (mobile through 2x desktop).
	const widths = [640, 960, 1280, 1600, 2048, 2560];

	const dims = $derived(image.asset.metadata.dimensions);
	const lqip = $derived(image.asset.metadata.lqip);

	const src = $derived(urlFor(image).width(1280).auto('format').quality(85).url());
	const srcset = $derived(
		widths
			.map((w) => `${urlFor(image).width(w).auto('format').quality(85).url()} ${w}w`)
			.join(', ')
	);
</script>

<figure class="plate" class:plate--intrinsic={intrinsic} style:--lqip={lqip ? `url(${lqip})` : null}>
	<img
		{src}
		{srcset}
		{sizes}
		{alt}
		{loading}
		width={dims.width}
		height={dims.height}
		decoding="async"
	/>
</figure>

<style>
	.plate {
		margin: 0;
		display: block;
	}

	.plate--intrinsic img {
		display: block;
		width: 100%;
		height: auto;
		max-width: 100%;
	}

	img {
		background-image: var(--lqip);
		background-size: cover;
		background-position: center;
	}
</style>
