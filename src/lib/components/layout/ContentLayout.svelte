<!-- styling for content pages (.md) -->

<div class="prose prose-invert max-w-none h-full overflow-y-auto rounded-lg p-8 m-[1.5rem]">
	<slot />
</div>

<style>
	.prose {
		color: #d1d5db;
	}

	:global(.prose h1) {
		font-size: 2.5rem;
		font-family: 'Amatic SC', cursive;
		color: white;
	}

	:global(.prose h2) {
		font-size: 2.25rem;
		font-family: 'Amatic SC', cursive;
		color: rgb(213, 208, 238);
	}

	:global(.prose ul),
	:global(.prose ol),
	:global(.prose p) {
		font-size: 1.5rem;
		line-height: 1;
		margin-bottom: 1.5rem;
		margin-top: 1rem;
	}

	:global(.prose a) {
		color: #93c5fd;
	}

	:global(.prose code) {
		font-size: 1.2rem;
		color: #61ddad;
	}
</style>