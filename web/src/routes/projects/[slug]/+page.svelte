<script lang="ts">
	import { getProject } from '$lib/content/projects';

	let { data } = $props();

	const project = $derived(getProject(data.slug));
	const Content = $derived(project?.component);

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
	<title>{data.title} &middot; Nicholas Cullen Cooper</title>
	{#if data.excerpt}
		<meta name="description" content={data.excerpt} />
	{/if}
</svelte:head>

<article class="space-y-10">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">
			Project &middot; {periodFor(data.startedAt, data.endedAt)}
			<span class="mx-2 text-ink-muted">·</span>
			<span class="text-ink-muted">{data.status}</span>
		</p>
		<h1 class="font-serif text-4xl leading-tight font-normal tracking-tight md:text-5xl">
			{data.title}
		</h1>
		{#if data.excerpt}
			<p class="max-w-2xl font-serif text-xl leading-snug text-ink-muted italic md:text-2xl">
				{data.excerpt}
			</p>
		{/if}
	</header>

	{#if data.links.length > 0 || data.role || data.tech.length > 0}
		<dl class="grid max-w-2xl grid-cols-[6rem_1fr] gap-x-6 gap-y-2 font-sans text-sm">
			{#if data.role}
				<dt class="small-caps text-ink-muted">Role</dt>
				<dd>{data.role}</dd>
			{/if}
			{#if data.tech.length > 0}
				<dt class="small-caps text-ink-muted">Tech</dt>
				<dd>{data.tech.join(' · ')}</dd>
			{/if}
			{#if data.links.length > 0}
				<dt class="small-caps text-ink-muted">Links</dt>
				<dd>
					<ul class="space-y-1">
						{#each data.links as link}
							<li><a href={link.url}>{link.label}</a></li>
						{/each}
					</ul>
				</dd>
			{/if}
		</dl>
	{/if}

	<hr class="rule" />

	{#if Content}
		<div class="prose-essay max-w-2xl space-y-5 text-lg leading-relaxed">
			<Content />
		</div>
	{/if}
</article>
