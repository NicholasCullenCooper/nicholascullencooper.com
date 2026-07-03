<script lang="ts">
	import { urlFor } from '$lib/sanity';

	let { data } = $props();
</script>

<svelte:head>
	<title>Exhibitions &middot; Photography &middot; Nicholas Cullen Cooper</title>
	<meta
		name="description"
		content="Photographic exhibitions — curated, finite selections with editorial framing."
	/>
</svelte:head>

<article class="space-y-12">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">
			<a href="/photography" class="no-underline hover:underline">Photography</a>
			<span class="mx-2 text-ink-muted">·</span>
			<span class="text-ink-muted">Exhibitions</span>
		</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			Exhibitions.
		</h1>
		<p class="max-w-2xl font-serif text-lg leading-snug text-ink-muted italic">
			Curated selections with editorial framing. Each is a moment, finite and closed.
		</p>
	</header>

	<hr class="rule" />

	{#if data.exhibitions.length === 0}
		<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">No exhibitions yet.</p>
	{:else}
		<ul class="space-y-16 md:space-y-20">
			{#each data.exhibitions as ex, i (ex._id)}
				<li class="border-rule pb-16 last:border-b-0 last:pb-0 md:pb-20" class:border-b={i < data.exhibitions.length - 1}>
					<a
						href={`/photography/exhibitions/${ex.slug.current}`}
						class="grid grid-cols-1 gap-y-5 gap-x-10 no-underline hover:opacity-95 md:grid-cols-[1fr_24rem]"
					>
						<div class="space-y-3 md:order-1 md:row-span-2">
							{#if ex.coverPhoto}
								<img
									src={urlFor(ex.coverPhoto.image).width(960).auto('format').quality(85).url()}
									alt={ex.coverPhoto.alt}
									loading="lazy"
									class="w-full"
								/>
							{/if}
						</div>
						<div class="space-y-3">
							<p class="small-caps text-xs text-ink-muted">
								{#if ex.year}Vol. — {ex.year}{/if}
								{#if ex.year && ex.photoCount > 0}<span class="mx-2">·</span>{/if}
								{#if ex.photoCount > 0}
									{ex.photoCount} {ex.photoCount === 1 ? 'photograph' : 'photographs'}
								{/if}
							</p>
							<h2 class="font-serif text-3xl leading-tight font-medium tracking-tight md:text-4xl">
								{ex.title}
							</h2>
							{#if ex.excerpt}
								<p class="max-w-prose font-serif text-base leading-relaxed text-ink-muted italic">
									{ex.excerpt}
								</p>
							{/if}
						</div>
					</a>
				</li>
			{/each}
		</ul>
	{/if}
</article>
