<!-- src/routes/writeups/+page.svelte -->

<script>
    export let data;
</script>

<h1 class="text-3xl mb-4">Writeups</h1>
<ul>
  {#each data.categories as category}
    <li>
      <a href={`/writeups/${category}`} class="text-xl hover:underline">{category}</a>
    </li>
  {/each}
</ul>
