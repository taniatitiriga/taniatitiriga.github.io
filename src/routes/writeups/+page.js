// src/routes/writeups/+page.js

export async function load() {
  // List categories by scanning subfolders
    const categories = import.meta.glob('./*/+page.svelte');

    return {
        categories: Object.keys(categories).map(path =>
        path.split('/')[1] // "TryHackMe"
        )
    };
}
