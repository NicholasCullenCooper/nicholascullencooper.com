<script lang="ts">
	import { theme } from './theme.svelte';

	function label(pref: typeof theme.preference): string {
		if (pref === 'dark') return 'Dark';
		if (pref === 'system') return 'System';
		return 'Light';
	}

	function cycle() {
		if (theme.preference === 'light') theme.set('dark');
		else if (theme.preference === 'dark') theme.set('system');
		else theme.set('light');
	}
</script>

<button
	type="button"
	class="small-caps cursor-pointer no-underline hover:text-accent focus-visible:outline-accent"
	onclick={cycle}
	aria-label={`Theme: ${label(theme.preference)}. Click to cycle.`}
>
	{label(theme.preference)}
</button>
