<script lang="ts">
	import { urlFor } from '$lib/sanity';

	let { data } = $props();

	function formatYear(iso: string | undefined): string | undefined {
		if (!iso) return undefined;
		return new Date(iso).getFullYear().toString();
	}
</script>

<svelte:head>
	<title>Series &middot; Photography &middot; Nicholas Cullen Cooper</title>
	<meta
		name="description"
		content="Photographic series — ongoing bodies of work united by subject, place, or theme."
	/>
</svelte:head>

<article class="space-y-12">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">
			<a href="/photography" class="no-underline hover:underline">Photography</a>
			<span class="mx-2 text-ink-muted">·</span>
			<span class="text-ink-muted">Series</span>
		</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			Series.
		</h1>
		<p class="max-w-2xl font-serif text-lg leading-snug text-ink-muted italic">
			Ongoing bodies of work, united by subject, place, or theme.
		</p>
	</header>

	<hr class="rule" />

	{#if data.series.length === 0}
		<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">No series yet.</p>
	{:else}
		<ul>
			{#each data.series as s, i (s._id)}
				<li
					class="grid grid-cols-1 gap-x-8 gap-y-4 border-rule py-8 md:grid-cols-[16rem_1fr]"
					class:border-t={i === 0}
					class:border-b={true}
				>
					<a
						href={`/photography/series/${s.slug.current}`}
						class="block no-underline hover:opacity-95"
					>
						{#if s.coverPhoto}
							<img
								src={urlFor(s.coverPhoto.image).width(640).auto('format').quality(85).url()}
								alt={s.coverPhoto.alt}
								loading="lazy"
								class="w-full"
							/>
						{:else}
							<div class="aspect-[4/3] w-full bg-rule/30"></div>
						{/if}
					</a>
					<div class="space-y-3">
						<div class="space-y-1">
							<p class="small-caps text-xs text-ink-muted">
								{s.photoCount} {s.photoCount === 1 ? 'photograph' : 'photographs'}
								{#if formatYear(s.startedAt)}
									<span class="mx-2">·</span>
									<span>ongoing since {formatYear(s.startedAt)}</span>
								{/if}
							</p>
							<a
								href={`/photography/series/${s.slug.current}`}
								class="block no-underline hover:text-accent"
							>
								<h2 class="font-serif text-2xl leading-snug font-medium md:text-3xl">
									{s.title}
								</h2>
							</a>
						</div>
						{#if s.description}
							<p class="max-w-prose text-base leading-relaxed text-ink-muted">
								{s.description}
							</p>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</article>
