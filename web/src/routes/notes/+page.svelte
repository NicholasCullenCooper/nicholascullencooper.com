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
	<title>Notes &middot; Nicholas Cullen Cooper</title>
	<meta
		name="description"
		content="Shorter writing, reading notes, and an evolving garden of ideas."
	/>
</svelte:head>

<article class="space-y-12">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">Notes</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			A garden of reading and thought.
		</h1>
	</header>

	<hr class="rule" />

	{#if data.notes.length === 0}
		<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">
			The garden is empty for now. Notes will arrive when they're worth keeping.
		</p>
	{:else}
		<ul class="space-y-8">
			{#each data.notes as note (note.slug)}
				<li class="space-y-1">
					<p class="small-caps text-xs text-ink-muted">
						{formatDate(note.updated ?? note.created)}
						{#if note.tags.length > 0}
							<span class="mx-2">&middot;</span>
							{note.tags.join(' · ')}
						{/if}
					</p>
					<a href={`/notes/${note.slug}`} class="block no-underline hover:text-accent">
						<h2 class="font-serif text-xl leading-snug font-medium md:text-2xl">{note.title}</h2>
					</a>
					{#if note.excerpt}
						<p class="max-w-2xl text-base leading-relaxed text-ink-muted">{note.excerpt}</p>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</article>
