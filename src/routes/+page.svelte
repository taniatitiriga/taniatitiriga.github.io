<!-- landing page -->

<script lang="ts">
	import { page } from '$app/stores';
	import { base } from '$app/paths';

	export let isAnimating: boolean;

	$: showContent = !isAnimating && $page.url.pathname === `${base}/`;
</script>

<svelte:head>
	<meta name="description" content="Homepage with an interactive background." />
</svelte:head>

{#if showContent}
	<div class="flex flex-col items-center justify-center h-full text-center text-white">
		<h1 class="text-4xl mb-8" style="font-family: 'Amatic SC', cursive;" >Welcome to my website!</h1>
		<p class="text-2xl mb-4">I'm Tania, a computer science student and CTF player. Nice to meet you!</p>
		<p class="text-2xl">My interests include cryptography, cybersecurity, blockchain technologies and quantum computing.</p>
		<p class="text-2xl mb-4">Outside of tech, I enjoy painting, psychology and public speaking.</p>
		<p class="text-2xl">Open the left menu to see my posts, or the right one to get in touch!</p>
	</div>
{/if}