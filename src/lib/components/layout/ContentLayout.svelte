<!-- src/lib/components/layout/ContentLayout.svelte -->

<div
	class="prose prose-invert max-w-none h-full overflow-y-auto rounded-lg p-8"
>
	<slot />
</div>

<style>
	.prose {
		color: #d1d5db;
	}
</style>