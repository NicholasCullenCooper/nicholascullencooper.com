<script lang="ts">
	import { PortableText } from '@portabletext/svelte';
	import Plate from '$lib/Plate.svelte';
	import { formatExif } from '$lib/exif';

	let { data } = $props();

	const exhibition = $derived(data.exhibition);

	function formatDate(value: string | Date | undefined): string | undefined {
		if (!value) return undefined;
		const d = typeof value === 'string' ? new Date(value) : value;
		return d.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{exhibition.title} &middot; Exhibition &middot; Nicholas Cullen Cooper</title>
</svelte:head>

<article class="space-y-16 md:space-y-24">
	<header class="max-w-3xl space-y-4">
		<p class="small-caps text-xs text-accent">
			<a href="/photography" class="no-underline hover:underline">Photography</a>
			<span class="mx-2 text-ink-muted">·</span>
			<a href="/photography/exhibitions" class="no-underline hover:underline">Exhibitions</a>
			{#if exhibition.year}
				<span class="mx-2 text-ink-muted">·</span>
				<span class="text-ink-muted">{exhibition.year}</span>
			{/if}
		</p>
		<h1
			class="font-serif text-5xl leading-[1.05] font-normal tracking-tight sm:text-6xl md:text-7xl"
		>
			{exhibition.title}
		</h1>
	</header>

	{#if exhibition.curatorialText && exhibition.curatorialText.length > 0}
		<section class="prose-essay max-w-2xl space-y-5 text-lg leading-relaxed">
			<PortableText value={exhibition.curatorialText} />
		</section>
	{/if}

	<hr class="rule" />

	{#if exhibition.photos.length === 0}
		<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">
			No photographs in this exhibition yet.
		</p>
	{:else}
		<ul class="space-y-24 md:space-y-32">
			{#each exhibition.photos as photo, i (photo._id)}
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
