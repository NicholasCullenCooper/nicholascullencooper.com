<script lang="ts">
	type Section = { name: string; blurb: string; href: string };

	const sections: Section[] = [
		{ name: 'Writing', blurb: 'Essays, reviews, notes-as-essays.', href: '/writing' },
		{ name: 'Photography', blurb: 'Plates and series.', href: '/photography' },
		{ name: 'Projects', blurb: 'Software, design, things made.', href: '/projects' },
		{ name: 'Notes', blurb: 'A garden of reading and thought.', href: '/notes' },
		{ name: 'Reading', blurb: 'A running cabinet of recommendations.', href: '/reading' }
	];
</script>

<svelte:head>
	<title>Nicholas Cullen Cooper</title>
	<meta
		name="description"
		content="Writing, photography, engineering, and the things in between, by Nicholas Cullen Cooper."
	/>
</svelte:head>

<section class="space-y-20 md:space-y-24">
	<!-- Cover: tag elevated to hero in the absence of a featured volume -->
	<h1
		class="max-w-5xl font-serif text-5xl leading-[1.05] font-normal tracking-tight sm:text-6xl md:text-7xl"
	>
		Writing, photography, engineering, and the things in between.
	</h1>

	<hr class="rule" />

	<!-- The map: persistent sections -->
	<div class="space-y-6">
		<p class="small-caps text-xs text-ink-muted">The site</p>
		<ul>
			{#each sections as s, i (s.name)}
				<li class="border-rule py-4" class:border-t={i === 0} class:border-b={true}>
					<a href={s.href} class="block space-y-1 no-underline hover:text-accent">
						<p class="font-serif text-xl font-normal">{s.name}</p>
						<p class="font-sans text-sm text-ink-muted">{s.blurb}</p>
					</a>
				</li>
			{/each}
		</ul>
	</div>

	<!-- Correspondence -->
	<div class="max-w-2xl space-y-4">
		<p class="small-caps text-xs text-ink-muted">Correspondence</p>
		<ul class="space-y-2 font-sans text-base">
			<li>
				<a href="mailto:hello@nicholascullencooper.com">hello@nicholascullencooper.com</a>
			</li>
			<li>
				<a href="https://github.com/nicholascullencooper">GitHub</a>
			</li>
		</ul>
	</div>
</section>
