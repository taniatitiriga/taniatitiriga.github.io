// src/routes/writeups/TryHackMe/+page.js

const mdModules = import.meta.glob('./*.md', { eager: true });
const rawModules = import.meta.glob('./*.md', { as: 'raw', eager: true });

/** @type {import('./$types').PageLoad} */
export function load() {
  const writeups = Object.entries(mdModules).map(([path, mod]) => {
    const slug = path.replace('./', '').replace('.md', '');

    // Try to get excerpt from frontmatter metadata
    let excerpt = mod.metadata?.excerpt;

    // If no excerpt in frontmatter, fallback to first non-empty line from raw markdown
    if (!excerpt) {
      const raw = rawModules[path] || '';
      excerpt = raw
        .split('\n')
        .map(line => line.trim())
        .find(line => line.length > 0 && !line.startsWith('#')) ?? ''; // skip headers
    }

    return {
      slug,
      title: mod.metadata?.title ?? slug,
      excerpt
    };
  });

  return { writeups };
}
