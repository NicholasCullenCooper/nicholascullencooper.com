<script lang="ts">
	import { getEssay } from '$lib/content/writing';

	let { data } = $props();

	const essay = $derived(getEssay(data.slug));
	const Content = $derived(essay?.component);

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
		<p class="small-caps text-xs text-accent">Essay &middot; {formatDate(data.date)}</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			{data.title}
		</h1>
		{#if data.excerpt}
			<p class="max-w-2xl font-serif text-xl leading-snug text-ink-muted italic md:text-2xl">
				{data.excerpt}
			</p>
		{/if}
	</header>

	<hr class="rule" />

	{#if Content}
		<div class="prose-essay max-w-2xl space-y-5 text-lg leading-relaxed">
			<Content />
		</div>
	{/if}
</article>
