<script lang="ts">
	let { data } = $props();

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Writing &middot; Nicholas Cullen Cooper</title>
	<meta name="description" content="Essays, reviews, and notes-as-essays by Nicholas Cullen Cooper." />
</svelte:head>

<article class="space-y-12">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">Writing</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			Essays, reviews, notes-as-essays.
		</h1>
	</header>

	<hr class="rule" />

	{#if data.essays.length === 0}
		<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">Nothing published yet.</p>
	{:else}
		<ul class="space-y-10">
			{#each data.essays as essay (essay.slug)}
				<li class="space-y-2">
					<p class="small-caps text-xs text-ink-muted">{formatDate(essay.date)}</p>
					<a href={`/writing/${essay.slug}`} class="block no-underline hover:text-accent">
						<h2 class="font-serif text-2xl leading-snug font-medium md:text-3xl">
							{essay.title}
						</h2>
					</a>
					{#if essay.excerpt}
						<p class="max-w-2xl text-base leading-relaxed text-ink-muted">{essay.excerpt}</p>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</article>
