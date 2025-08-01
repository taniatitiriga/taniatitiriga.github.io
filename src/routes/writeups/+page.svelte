<!-- src/routes/writeups/+page.svelte -->

<script>
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	export let data;
</script>

<PageContainer>
	<h1 class="text-3xl mb-4">Writeups</h1>
	<ul>
		{#each data.categories as category}
			<li>
				<a href={`/writeups/${category}`} class="text-xl hover:underline">{category}</a>
			</li>
		{/each}
	</ul>
</PageContainer>