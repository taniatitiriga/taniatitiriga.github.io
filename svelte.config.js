// svelte.config.js
import adapter from '@sveltejs/adapter-static'; // <-- IMPORT THIS
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // Use adapter-static for GitHub Pages
    adapter: adapter({
      // Default options are fine for a user/organization page
      pages: 'build',
      assets: 'build',
      fallback: '404.html', // Use 404.html for SPA-like routing
      precompress: false
    }),
    // IMPORTANT: Because you are using a user page (YourUsername.github.io)
    // and NOT a project page (YourUsername.github.io/repo-name),
    // you DO NOT need to set the `paths.base` option. Keep it clean.
  }
};

export default config;