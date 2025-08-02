<script>
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	export let data;
</script>

<PageContainer>
	<h2 class="text-3xl mb-4" style="font-family: 'Amatic SC', cursive;" >Projects</h2>
	<p class="text-2xl mb-6">Here you can find posts about some projects I worked on (available on GitHub!):</p>
	<ul>
        {#each data?.projects ?? [] as project}
            <li class="mb-2">
                <a href={`/projects/${project.slug}`} class="text-3xl hover:underline">
                    {project.title}
                </a>
                <p class="text-gray-400 text-2xl">{project.excerpt}</p>
            </li>
        {/each}
    </ul>
</PageContainer>