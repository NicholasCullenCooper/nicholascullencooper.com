<script lang="ts">
	const swatches = [
		{ name: 'paper', token: '--color-paper', role: 'Page background' },
		{ name: 'ink', token: '--color-ink', role: 'Primary text' },
		{ name: 'ink-muted', token: '--color-ink-muted', role: 'Secondary text' },
		{ name: 'rule', token: '--color-rule', role: 'Hairlines, dividers' },
		{ name: 'accent', token: '--color-accent', role: 'Vermillion, one committed color' },
		{ name: 'accent-ink', token: '--color-accent-ink', role: 'Text on accent fills' }
	] as const;

	const typeScale = [
		{ label: 'Display · 8xl', size: 'text-8xl' },
		{ label: 'Hero · 7xl', size: 'text-7xl' },
		{ label: 'H1 · 5xl', size: 'text-5xl' },
		{ label: 'H2 · 3xl', size: 'text-3xl' },
		{ label: 'H3 · 2xl', size: 'text-2xl' },
		{ label: 'Body lg', size: 'text-lg' },
		{ label: 'Body', size: 'text-base' }
	];

	const motionTokens = [
		{ name: 'quick', token: '--duration-quick', ms: '240ms' },
		{ name: 'medium', token: '--duration-medium', ms: '320ms' },
		{ name: 'slow', token: '--duration-slow', ms: '480ms' }
	];
</script>

<svelte:head>
	<title>Styleguide · Nicholas Cullen Cooper</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<article class="max-w-4xl space-y-24">
	<header class="space-y-3">
		<p class="small-caps text-xs text-accent">Styleguide</p>
		<h1 class="font-serif text-4xl font-normal tracking-tight md:text-5xl">
			Design tokens and primitives.
		</h1>
		<p class="max-w-xl text-base text-ink-muted">
			Internal reference for the site's identity. Rationale is documented in
			<code class="font-mono text-sm">DESIGN-IDENTITY.md</code> at the repo root.
		</p>
	</header>

	<hr class="rule" />

	<section class="space-y-6">
		<h2 class="small-caps text-xs text-ink-muted">01 &middot; Color</h2>
		<div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
			{#each swatches as swatch (swatch.name)}
				<div class="flex items-stretch gap-4">
					<div
						class="h-20 w-20 shrink-0 rounded-sm border border-rule"
						style="background-color: var({swatch.token});"
					></div>
					<div class="flex flex-col justify-between py-1">
						<div>
							<p class="small-caps text-xs text-ink-muted">{swatch.name}</p>
							<p class="font-mono text-sm">{swatch.token}</p>
						</div>
						<p class="text-sm text-ink-muted">{swatch.role}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<hr class="rule" />

	<section class="space-y-8">
		<h2 class="small-caps text-xs text-ink-muted">02 &middot; Typography</h2>

		<div class="space-y-3">
			<p class="small-caps text-xs text-ink-muted">Serif &middot; Sentient</p>
			<p class="font-serif text-6xl leading-[1.02] font-normal md:text-7xl">
				A quiet confidence.
			</p>
			<p class="font-serif text-3xl font-medium md:text-4xl">Warm, decisive, editorial.</p>
			<p class="font-serif text-xl italic">
				Old-style figures: 0123456789 &mdash; matching pace with the lowercase.
			</p>
		</div>

		<div class="space-y-3">
			<p class="small-caps text-xs text-ink-muted">Sans &middot; Switzer</p>
			<p class="font-sans text-2xl font-medium">Structural furniture. Labels. Metadata.</p>
			<p class="small-caps font-sans text-base">
				Section Labels &middot; Running Heads &middot; Metadata
			</p>
		</div>

		<div class="space-y-3">
			<p class="small-caps text-xs text-ink-muted">Mono &middot; JetBrains Mono</p>
			<p class="font-mono text-base">
				{`const identity = { warmth: true, decisiveness: true };`}
			</p>
		</div>
	</section>

	<hr class="rule" />

	<section class="space-y-6">
		<h2 class="small-caps text-xs text-ink-muted">03 &middot; Scale</h2>
		<div class="space-y-4">
			{#each typeScale as step (step.label)}
				<div class="grid grid-cols-[7rem_1fr] items-baseline gap-4">
					<p class="small-caps text-xs text-ink-muted">{step.label}</p>
					<p class={`font-serif font-normal ${step.size}`}>The quick brown fox.</p>
				</div>
			{/each}
		</div>
	</section>

	<hr class="rule" />

	<section class="space-y-6">
		<h2 class="small-caps text-xs text-ink-muted">04 &middot; Long-form specimen</h2>
		<div class="space-y-5 text-lg leading-relaxed">
			<p class="drop-cap">
				A small publication, made by one author, prints slowly and deliberately. The
				vocabulary is borrowed: hairline rules, small-caps labels, drop capitals &mdash;
				the inherited furniture of editorial design, adapted to the web rather than
				impersonated.
			</p>
			<p>
				Type is set for reading: old-style figures, a measure that doesn't strain the eye,
				and a paper color that leans warm. Photographs run large &mdash; one at a time,
				room to breathe.
			</p>
			<blockquote class="border-l-2 border-accent pl-6 text-2xl leading-snug font-normal italic">
				&ldquo;Strength through specificity. Being niche means you have the ability to build
				loyalty &mdash; which surely is at least one key to survival.&rdquo;
				<footer class="small-caps mt-3 text-xs text-ink-muted not-italic">
					Anja Aronowsky Cronberg, Vestoj
				</footer>
			</blockquote>
		</div>
	</section>

	<hr class="rule" />

	<section class="space-y-4">
		<h2 class="small-caps text-xs text-ink-muted">05 &middot; Motion</h2>
		<p class="max-w-xl text-base text-ink-muted">
			Ease: <code class="font-mono text-sm">cubic-bezier(0.2, 0.8, 0.2, 1)</code>. Slow-start,
			gentle-arrival. Never bouncy. All animations respect
			<code class="font-mono text-sm">prefers-reduced-motion</code>.
		</p>
		<ul class="space-y-2 font-mono text-sm">
			{#each motionTokens as m (m.name)}
				<li>
					<span class="small-caps text-ink-muted">{m.name}</span>
					<span class="mx-2 text-ink-muted">&middot;</span>
					{m.token} &rarr; {m.ms}
				</li>
			{/each}
		</ul>
	</section>
</article>
