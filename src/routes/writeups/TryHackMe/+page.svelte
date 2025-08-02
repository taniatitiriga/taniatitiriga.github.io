<script>
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	export let data;
</script>

<PageContainer>
	<h2 class="text-3xl mb-4"  style="font-family: 'Amatic SC', cursive;" >TryHackMe Writeups</h2>
	<p class="text-2xl mb-6">Here are my writeups for some rooms I liked from TryHackMe:</p>
	<ul>
		{#each data.writeups as post}
			<li class="mb-2">
				<a href={`/writeups/TryHackMe/${post.slug}`} class="text-3xl hover:underline">
					{post.title}
				</a>
				<p class="text-gray-400 text-2xl">{post.excerpt}</p>
			</li>
		{/each}
	</ul>
</PageContainer>