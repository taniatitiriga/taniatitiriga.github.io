<script>
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	import { base } from '$app/paths';
	export let data;
</script>

<PageContainer>
	<h2 class="text-3xl mb-6"  style="font-family: 'Amatic SC', cursive;" >Hackday 2026 Writeups</h2>
	<p class="text-2xl mb-2">This year, Hackday Quals had a new category: Web3!</p>
	<p class="text-2xl mb-12">I had fun solving these blockchain security challenges and they taught me about some interesting vulnerabilities along the way. Hope you enjoy!</p>
	<ul>
		{#each data.writeups as post}
			<li class="mb-2">
				<a href={`${base}/writeups/Hackday_2026/${post.slug}`} class="text-3xl hover:underline">
					{post.title}
				</a>
				<p class="text-gray-400 text-2xl">{post.excerpt}</p>
			</li>
		{/each}
	</ul>
</PageContainer>