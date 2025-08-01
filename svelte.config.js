// svelte.config.js

import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import path from 'node:path'; // <-- 1. Import the Node.js path module

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			// 2. We create an absolute path that the preprocessor can always find.
			layout: {
				_: path.resolve('./src/lib/components/layout/ContentLayout.svelte')
			},
			highlight: {
				alias: { sh: 'bash', py: 'python', js: 'javascript' }
			}
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/website' : ''
		}
	}
};

export default config;