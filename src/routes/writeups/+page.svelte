<script>
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import { base } from '$app/paths';
	export let data;
</script>

<PageContainer>
	<h1 class="text-3xl mb-6" style="font-family: 'Amatic SC', cursive;" >Writeups</h1>
	<p class="text-2xl mb-2">Here you can read about my solutions for some security challenges I found interesting.</p>
	<p class="text-2xl mb-12">Pick an event:</p>
	<ul>
		{#each data.categories as category}
			<li>
				<a href={`${base}/writeups/${category}`} class="text-3xl hover:underline">{category}</a>
			</li>
		{/each}
	</ul>
</PageContainer>