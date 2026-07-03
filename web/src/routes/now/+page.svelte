<script lang="ts">
	import { getPage } from '$lib/content/pages';

	let { data } = $props();

	const page = $derived(getPage('now'));
	const Content = $derived(page?.component);

	function formatDate(iso: string | undefined): string | undefined {
		if (!iso) return undefined;
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.title} &middot; Nicholas Cullen Cooper</title>
	{#if data.description}
		<meta name="description" content={data.description} />
	{/if}
</svelte:head>

<article class="space-y-10">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">Now</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			{data.title}
		</h1>
		{#if data.updated}
			<p class="small-caps text-xs text-ink-muted">Updated {formatDate(data.updated)}</p>
		{/if}
	</header>

	<hr class="rule" />

	{#if Content}
		<div class="prose-page max-w-2xl space-y-5 text-lg leading-relaxed">
			<Content />
		</div>
	{/if}
</article>
