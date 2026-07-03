<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { theme } from '$lib/theme.svelte';
	import ThemeToggle from '$lib/ThemeToggle.svelte';

	let { children } = $props();

	onMount(() => {
		theme.init();
	});

	const currentYear = new Date().getFullYear();
</script>

<svelte:head>
	<link rel="icon" href="/favicon.svg" />
</svelte:head>

<div class="mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 sm:px-10 md:px-16 md:py-12">
	<header class="mb-10 flex items-baseline justify-between gap-6 md:mb-14">
		<a
			href="/"
			class="small-caps text-sm no-underline hover:text-accent md:text-base"
			style="letter-spacing: 0.12em;"
		>
			Nicholas Cullen Cooper
		</a>
		<ThemeToggle />
	</header>

	<main class="grow">
		{@render children()}
	</main>

	<footer
		class="mt-24 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-rule pt-6 font-sans text-xs text-ink-muted md:mt-32"
	>
		<span>&copy; {currentYear} Nicholas Cullen Cooper. All rights reserved.</span>
		<nav class="flex flex-wrap gap-x-4 gap-y-1">
			<a href="/about" class="no-underline hover:underline">about</a>
			<a href="/now" class="no-underline hover:underline">now</a>
			<a href="/colophon" class="no-underline hover:underline">colophon</a>
			<a href="/styleguide" class="no-underline hover:underline">styleguide</a>
		</nav>
	</footer>
</div>
