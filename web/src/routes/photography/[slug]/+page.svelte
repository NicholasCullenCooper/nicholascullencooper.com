<script lang="ts">
	import Plate from '$lib/Plate.svelte';
	import { formatExif } from '$lib/exif';

	let { data } = $props();

	const photo = $derived(data.photo);
	const exif = $derived(formatExif(photo.image.asset.metadata.exif));

	function formatDate(value: string | Date | undefined): string | undefined {
		if (!value) return undefined;
		const d = typeof value === 'string' ? new Date(value) : value;
		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}

	const dateLabel = $derived(formatDate(photo.date ?? exif.dateTaken));

	const exposureParts = $derived(
		[exif.focalLength, exif.aperture, exif.shutter, exif.iso].filter(Boolean).join(' · ')
	);
</script>

<svelte:head>
	<title>{photo.title} &middot; Nicholas Cullen Cooper</title>
	{#if photo.caption}
		<meta name="description" content={photo.caption} />
	{/if}
</svelte:head>

<article class="space-y-10">
	<Plate image={photo.image} alt={photo.alt} loading="eager" sizes="(min-width: 1024px) 64rem, 100vw" />

	<header class="max-w-2xl space-y-4">
		{#if dateLabel}
			<p class="small-caps text-xs text-accent">{dateLabel}</p>
		{/if}
		<h1 class="font-serif text-3xl leading-tight font-normal tracking-tight md:text-4xl">
			{photo.title}
		</h1>
		{#if photo.caption}
			<p class="font-serif text-lg leading-snug text-ink-muted italic">
				{photo.caption}
			</p>
		{/if}
	</header>

	<hr class="rule max-w-2xl" />

	<dl
		class="grid max-w-2xl grid-cols-[7rem_1fr] gap-x-6 gap-y-2 font-sans text-sm"
	>
		{#if photo.location}
			<dt class="small-caps text-ink-muted">Location</dt>
			<dd>{photo.location}</dd>
		{/if}
		{#if exif.camera}
			<dt class="small-caps text-ink-muted">Camera</dt>
			<dd>{exif.camera}</dd>
		{/if}
		{#if exif.lens}
			<dt class="small-caps text-ink-muted">Lens</dt>
			<dd>{exif.lens}</dd>
		{/if}
		{#if exposureParts}
			<dt class="small-caps text-ink-muted">Exposure</dt>
			<dd>{exposureParts}</dd>
		{/if}
		{#if photo.series && photo.series.length > 0}
			<dt class="small-caps text-ink-muted">Series</dt>
			<dd>
				{#each photo.series as s, i (s._id)}
					{#if i > 0}<span class="text-ink-muted">,</span> {/if}<a
						href={`/photography/series/${s.slug.current}`}
					>{s.title}</a>
				{/each}
			</dd>
		{/if}
		{#if photo.exhibitions && photo.exhibitions.length > 0}
			<dt class="small-caps text-ink-muted">Exhibitions</dt>
			<dd>
				{#each photo.exhibitions as e, i (e._id)}
					{#if i > 0}<span class="text-ink-muted">,</span> {/if}<a
						href={`/photography/exhibitions/${e.slug.current}`}
					>{e.title}{#if e.year}<span class="text-ink-muted"> · {e.year}</span>{/if}</a>
				{/each}
			</dd>
		{/if}
	</dl>
</article>
