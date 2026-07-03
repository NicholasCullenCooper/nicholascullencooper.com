import adapter from '@sveltejs/adapter-cloudflare';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.svx', '.md'],
	compilerOptions: {
		runes: ({ filename }) => (filename.split(/[/\\]/).includes('node_modules') ? undefined : true)
	},
	preprocess: [
		mdsvex({
			extensions: ['.svx', '.md'],
			smartypants: { dashes: 'oldschool' }
		})
	],
	kit: {
		adapter: adapter(),
		prerender: {
			handleMissingId: 'warn'
		}
	}
};

export default config;
