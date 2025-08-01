<!-- src/lib/components/layout/ContentLayout.svelte -->

<div
	class="prose prose-invert max-w-none h-full overflow-y-auto rounded-lg p-8 m-[1rem]"
>
	<slot />
</div>

<style>
	.prose {
		color: #d1d5db;
	}
	/* Example 1: Change all main headers (H1) */
	:global(.prose h1) {
		font-size: 2.5rem; /* Make headers bigger */
		font-family: 'Amatic SC', cursive; /* Use a different font */
		color: white;
	}

	:global(.prose h2) {
		font-size: 2.25rem; /* Make headers bigger */
		font-family: 'Amatic SC', cursive; /* Use a different font */
		color: rgb(213, 208, 238);
	}

	/* Example 2: Change all paragraph text */
	:global(.prose p) {
		font-size: 1.5rem; /* Slightly larger paragraph text */
		line-height: 3; /* More space between lines */
	}

	/* Example 3: Change link colors */
	:global(.prose a) {
		color: #93c5fd; /* A light blue color for links */
	}
</style>