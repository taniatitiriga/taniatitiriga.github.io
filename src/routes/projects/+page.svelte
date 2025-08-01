<script>
	import PageContainer from '$lib/components/layout/PageContainer.svelte';
	export let data;
</script>

<PageContainer>
	<h2 class="text-4xl mb-4">Projects</h2>
	<ul>
        {#each data?.projects ?? [] as project}
            <li class="mb-2">
                <a href={`/projects/${project.slug}`} class="text-3xl hover:underline">
                    {project.title}
                </a>
                <p class="text-gray-400 text-2xl">{project.excerpt}</p>
            </li>
        {/each}
</PageContainer>