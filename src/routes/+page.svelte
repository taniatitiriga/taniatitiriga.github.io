<!-- src/routes/+page.svelte -->
 
<script lang="ts">
	import { page } from '$app/stores';

	export let isAnimating: boolean;

	$: showContent = !isAnimating && $page.url.pathname === ($page.data.base || '') + '/';
</script>

<svelte:head>
	<title>Taniusca - Home</title>
	<meta name="description" content="Homepage with an interactive background." />
</svelte:head>

{#if showContent}
	<div class="flex flex-col items-center justify-center min-h-screen text-center text-white">
		<h1 class="text-4xl mb-4">Welcome to my site</h1>
		<p class="text-xl">This is the landing page mock content.</p>
	</div>
{/if}