<script lang="ts">
	import Plate from '$lib/Plate.svelte';
	import { formatExif } from '$lib/exif';

	let { data } = $props();

	function formatDate(iso: string | undefined): string | undefined {
		if (!iso) return undefined;
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Photography &middot; Nicholas Cullen Cooper</title>
	<meta
		name="description"
		content="Plates and series by Nicholas Cullen Cooper."
	/>
</svelte:head>

<article class="space-y-16">
	<header class="space-y-4">
		<p class="small-caps text-xs text-accent">Photography</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			Photographs.
		</h1>
		<nav class="small-caps flex flex-wrap gap-x-5 gap-y-1 font-sans text-xs text-ink-muted">
			<a href="/photography" class="text-ink no-underline">All</a>
			<a href="/photography/series" class="no-underline hover:underline">Series</a>
			<a href="/photography/exhibitions" class="no-underline hover:underline">Exhibitions</a>
		</nav>
	</header>

	<hr class="rule" />

	{#if data.photos.length === 0}
		<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">Nothing published yet.</p>
	{:else}
		<ul class="space-y-24 md:space-y-32">
			{#each data.photos as photo, i (photo._id)}
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
								{#if dateLabel && photo.location}
									<span class="mx-2">&middot;</span>
								{/if}
								{#if photo.location}{photo.location}{/if}
							</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</article>
