<script lang="ts">
	import Plate from '$lib/Plate.svelte';
	import { formatExif } from '$lib/exif';

	let { data } = $props();

	const series = $derived(data.series);

	function formatDate(value: string | Date | undefined): string | undefined {
		if (!value) return undefined;
		const d = typeof value === 'string' ? new Date(value) : value;
		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	function formatYear(iso: string | undefined): string | undefined {
		if (!iso) return undefined;
		return new Date(iso).getFullYear().toString();
	}
</script>

<svelte:head>
	<title>{series.title} &middot; Series &middot; Nicholas Cullen Cooper</title>
	{#if series.description}
		<meta name="description" content={series.description} />
	{/if}
</svelte:head>

<article class="space-y-16">
	<header class="max-w-3xl space-y-4">
		<p class="small-caps text-xs text-accent">
			<a href="/photography" class="no-underline hover:underline">Photography</a>
			<span class="mx-2 text-ink-muted">·</span>
			<a href="/photography/series" class="no-underline hover:underline">Series</a>
		</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			{series.title}
		</h1>
		{#if series.description}
			<p class="font-serif text-lg leading-snug text-ink-muted italic">
				{series.description}
			</p>
		{/if}
		<p class="small-caps text-xs text-ink-muted">
			{series.photos.length}
			{series.photos.length === 1 ? 'photograph' : 'photographs'}
			{#if formatYear(series.startedAt)}
				<span class="mx-2">·</span>
				<span>ongoing since {formatYear(series.startedAt)}</span>
			{/if}
		</p>
	</header>

	<hr class="rule" />

	{#if series.photos.length === 0}
		<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">No photographs in this series yet.</p>
	{:else}
		<ul class="space-y-24 md:space-y-32">
			{#each series.photos as photo, i (photo._id)}
				{@const exif = formatExif(photo.image.asset.metadata.exif)}
				{@const dateLabel = formatDate(photo.date ?? exif.dateTaken?.toISOString())}
				<li>
					<a
						href={`/photography/${photo.slug.current}`}
						class="block space-y-5 no-underline hover:opacity-95"
					>
						<Plate
							image={photo.image}
							alt={photo.alt}
							loading={i === 0 ? 'eager' : 'lazy'}
							sizes="(min-width: 1024px) 64rem, 100vw"
						/>
						<div class="space-y-2">
							<p class="font-serif text-lg leading-snug font-medium md:text-xl">
								{photo.title}
							</p>
							{#if photo.caption}
								<p class="max-w-prose font-serif text-base leading-snug text-ink-muted italic">
									{photo.caption}
								</p>
							{/if}
							<p class="small-caps font-sans text-xs text-ink-muted">
								{#if dateLabel}{dateLabel}{/if}
								{#if dateLabel && photo.location}<span class="mx-2">&middot;</span>{/if}
								{#if photo.location}{photo.location}{/if}
							</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</article>
