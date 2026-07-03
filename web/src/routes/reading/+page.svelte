<script lang="ts">
	let { data } = $props();

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Reading &middot; Nicholas Cullen Cooper</title>
	<meta
		name="description"
		content="A running cabinet of articles, books, papers, and other reading worth keeping."
	/>
</svelte:head>

<article class="space-y-12">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">Reading</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			A running cabinet.
		</h1>
		<p class="max-w-2xl font-serif text-lg leading-snug text-ink-muted italic">
			Articles, books, papers, and other reading worth coming back to.
		</p>
	</header>

	<hr class="rule" />

	{#if data.items.length === 0}
		<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">
			The cabinet is empty for now. Items arrive as they earn the space.
		</p>
	{:else}
		<ul class="space-y-6">
			{#each data.items as item (item.slug)}
				<li
					class="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-rule pb-6 md:grid-cols-[7rem_1fr]"
				>
					<p class="small-caps pt-1 text-xs text-ink-muted">
						{formatDate(item.addedAt)}
					</p>
					<div class="space-y-1">
						<a href={item.url} class="font-serif text-lg font-medium no-underline hover:underline">
							{item.title}
						</a>
						<p class="font-sans text-sm text-ink-muted">
							{#if item.author}{item.author}{/if}
							{#if item.author && item.source}<span class="mx-2">&middot;</span>{/if}
							{#if item.source}<span class="small-caps">{item.source}</span>{/if}
							{#if item.tags.length > 0}
								<span class="mx-2">&middot;</span>
								{item.tags.join(' · ')}
							{/if}
						</p>
						{#if item.note}
							<p class="max-w-2xl pt-1 text-base leading-relaxed text-ink-muted italic">
								{item.note}
							</p>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</article>
