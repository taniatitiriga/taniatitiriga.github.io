// src/routes/writeups/TryHackMe/+page.js

// This glob pattern now correctly looks in subdirectories (e.g., /Blue/post.md)
const mdModules = import.meta.glob('./**/*.md', { eager: true });
const rawModules = import.meta.glob('./**/*.md', { as: 'raw', eager: true });

/** @type {import('./$types').PageLoad} */
export function load() {
	const writeups = Object.entries(mdModules).map(([path, mod]) => {
		// Example path: './Blue/+page.md'
		// We extract the directory name 'Blue' to use as the slug.
		const slug = path.split('/')[1];

		// Try to get excerpt from frontmatter metadata
		let excerpt = mod.metadata?.description; // Using 'description' is more semantic

		// If no excerpt, create a fallback.
		if (!excerpt) {
			const raw = rawModules[path] || '';
			excerpt =
				raw
					.split('\n')
					.map((line) => line.trim())
					.find((line) => line.length > 0 && !line.startsWith('#')) ?? ''; // skip headers
		}

		return {
			slug,
			title: mod.metadata?.title ?? slug,
			excerpt
		};
	});

	return { writeups };
}