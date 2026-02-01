import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import path from 'node:path';
import { codeToHtml } from 'shiki';
import rehypeExternalLinks from 'rehype-external-links';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: {
				_: path.resolve('./src/lib/components/layout/ContentLayout.svelte')
			},
			rehypePlugins: [
				[rehypeExternalLinks.default, { target: '_blank', rel: ['noopener', 'noreferrer'] }]
			],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					const html = await codeToHtml(code, {
						lang,
						theme: 'dracula'
					});
					// Use String.raw to safely handle backticks in HTML output
					return `{@html String.raw\`${html}\`}`;
				}
			}
		})
	],
	kit: {
		paths: {
			base: '/website'
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html',
			precompress: false
		})
	}
};

export default config;