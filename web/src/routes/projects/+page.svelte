<script lang="ts">
	let { data } = $props();

	function formatYear(iso: string): string {
		return new Date(iso).getFullYear().toString();
	}

	function periodFor(startedAt: string, endedAt?: string): string {
		const start = formatYear(startedAt);
		if (!endedAt) return `${start} —`;
		const end = formatYear(endedAt);
		return start === end ? start : `${start}–${end}`;
	}
</script>

<svelte:head>
	<title>Projects &middot; Nicholas Cullen Cooper</title>
	<meta name="description" content="Software, design, and things Nicholas has made." />
</svelte:head>

<article class="space-y-12">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">Projects</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			Software, design, things made.
		</h1>
	</header>

	<hr class="rule" />

	{#if data.projects.length === 0}
		<p class="max-w-2xl text-lg leading-relaxed text-ink-muted">Nothing published yet.</p>
	{:else}
		<ul class="space-y-12">
			{#each data.projects as project (project.slug)}
				<li class="space-y-2">
					<p class="small-caps text-xs text-ink-muted">
						{periodFor(project.startedAt, project.endedAt)}
						<span class="mx-2">&middot;</span>
						{project.status}
					</p>
					<a href={`/projects/${project.slug}`} class="block no-underline hover:text-accent">
						<h2 class="font-serif text-2xl leading-snug font-medium md:text-3xl">{project.title}</h2>
					</a>
					{#if project.excerpt}
						<p class="max-w-2xl text-base leading-relaxed text-ink-muted">{project.excerpt}</p>
					{/if}
					{#if project.tech.length > 0}
						<p class="small-caps font-sans text-xs text-ink-muted">
							{project.tech.join(' · ')}
						</p>
					{/if}
				</li>
			{/each}
		</ul>
	{/if}
</article>
