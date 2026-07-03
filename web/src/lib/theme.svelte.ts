export type ThemePreference = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme-preference';

function readStored(): ThemePreference {
	if (typeof localStorage === 'undefined') return 'light';
	const v = localStorage.getItem(STORAGE_KEY);
	return v === 'dark' || v === 'system' ? v : 'light';
}

function effectiveTheme(pref: ThemePreference): 'light' | 'dark' {
	if (pref === 'system') {
		return typeof window !== 'undefined' &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
			? 'dark'
			: 'light';
	}
	return pref;
}

function applyTheme(theme: 'light' | 'dark') {
	if (typeof document === 'undefined') return;
	document.documentElement.dataset.theme = theme;
}

function createTheme() {
	let preference = $state<ThemePreference>('light');

	return {
		get preference() {
			return preference;
		},
		init() {
			preference = readStored();
			applyTheme(effectiveTheme(preference));
		},
		set(next: ThemePreference) {
			preference = next;
			if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, next);
			applyTheme(effectiveTheme(next));
		},
		toggle() {
			const current = effectiveTheme(preference);
			this.set(current === 'dark' ? 'light' : 'dark');
		}
	};
}

export const theme = createTheme();
