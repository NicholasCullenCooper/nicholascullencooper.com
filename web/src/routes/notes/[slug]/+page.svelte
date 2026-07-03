<script lang="ts">
	import { getNote } from '$lib/content/notes';

	let { data } = $props();

	const note = $derived(getNote(data.slug));
	const Content = $derived(note?.component);

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.title} &middot; Nicholas Cullen Cooper</title>
	{#if data.excerpt}
		<meta name="description" content={data.excerpt} />
	{/if}
</svelte:head>

<article class="space-y-10">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">
			Note &middot; {formatDate(data.created)}
			{#if data.updated}
				<span class="mx-2 text-ink-muted">·</span>
				<span class="text-ink-muted">updated {formatDate(data.updated)}</span>
			{/if}
		</p>
		<h1 class="font-serif text-3xl leading-tight font-normal tracking-tight md:text-4xl">
			{data.title}
		</h1>
	</header>

	<hr class="rule" />

	{#if Content}
		<div class="prose-note max-w-2xl space-y-5 text-lg leading-relaxed">
			<Content />
		</div>
	{/if}

	{#if data.tags.length > 0}
		<footer class="font-sans text-sm text-ink-muted">
			<span class="small-caps text-xs">Tags</span>
			<span class="ml-2">{data.tags.join(' · ')}</span>
		</footer>
	{/if}
</article>
