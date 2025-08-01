<!-- src/routes/writeups/TryHackMe/+page.svelte -->
 
<script>
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	export let data;
</script>

<PageContainer>
	<h2 class="text-2xl mb-4">TryHackMe Writeups</h2>
	<ul>
		{#each data.writeups as post}
			<li class="mb-2">
				<a href={`/writeups/TryHackMe/${post.slug}`} class="text-xl hover:underline">
					{post.title}
				</a>
				<p class="text-gray-400 text-sm">{post.excerpt}</p>
			</li>
		{/each}
	</ul>
</PageContainer>