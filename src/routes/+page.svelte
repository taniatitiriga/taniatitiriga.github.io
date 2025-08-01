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
	<div class="flex flex-col items-center justify-center h-full text-center text-white">
		<h1 class="text-4xl mb-4" style="font-family: 'Amatic SC', cursive;" >Welcome to my website!</h1>
		<p class="text-2xl">I'm Tania, a computer science student passionate about cryptography and cybersecurity in general.</p>
		<p class="text-2xl">Check out my writeups and projects!</p>
	</div>
{/if}