<script lang="ts">
	import { getPage } from '$lib/content/pages';

	let { data } = $props();

	const page = $derived(getPage('colophon'));
	const Content = $derived(page?.component);
</script>

<svelte:head>
	<title>{data.title} &middot; Nicholas Cullen Cooper</title>
	{#if data.description}
		<meta name="description" content={data.description} />
	{/if}
</svelte:head>

<article class="space-y-10">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">Colophon</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			{data.title}
		</h1>
	</header>

	<hr class="rule" />

	{#if Content}
		<div class="prose-page max-w-2xl space-y-5 text-lg leading-relaxed">
			<Content />
		</div>
	{/if}
</article>
