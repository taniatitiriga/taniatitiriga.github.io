<!-- src/lib/components/layout/LeftSidebar.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let show: boolean;
	export let isAnimating: boolean;

	const dispatch = createEventDispatcher();
</script>

{#if show}
	<button
		on:click={() => dispatch('turnMore')}
		disabled={isAnimating}
		class="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 rounded-md bg-black/10 px-4 py-2 text-[#b1babd] backdrop-blur-sm transition-all hover:bg-black/20 disabled:opacity-50"
	>
		Turn 75° More
	</button>
{/if}