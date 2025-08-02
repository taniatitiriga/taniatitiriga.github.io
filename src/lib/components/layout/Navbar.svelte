<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let isAnimating: boolean;
    export let turnedState: 'none' | 'left' | 'right';

    const dispatch = createEventDispatcher();
</script>

<!-- left sidebar toggle -->
<button
    on:click={() => dispatch('toggleLeft')}
    disabled={isAnimating || turnedState === 'right'}
    class="pointer-events-auto absolute left-4 top-3 rounded-md bg-transparent px-6 py-3 text-2xl text-[#b1babd] transition-all hover:text-white disabled:opacity-50"
>
    {#if turnedState === 'left'}
        <i class="fas fa-xmark"></i>
    {:else}
        <i class="fas fa-bars"></i>
    {/if}
</button>

<!-- right sidebar toggle -->
<button
    on:click={() => dispatch('toggleRight')}
    disabled={isAnimating || turnedState === 'left'}
    class="pointer-events-auto absolute right-4 top-3 rounded-md bg-transparent px-6 py-3 text-2xl text-[#b1babd] transition-all hover:text-white disabled:opacity-50"
>
    {#if turnedState === 'right'}
        <i class="fas fa-xmark"></i>
    {:else}
        <i class="fas fa-user"></i>
    {/if}
</button>

<!-- home title button -->
<button
    on:click={() => dispatch('reset')}
    disabled={isAnimating}
    class="pointer-events-auto absolute left-1/2 top-4 -translate-x-1/2 rounded-md bg-transparent px-4 py-2 text-3xl text-white transition-all hover:opacity-80 disabled:opacity-50"
    style="font-family: 'Amatic SC', cursive;"
>
    TANIUSCA
</button>
