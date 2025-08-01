<!-- src/lib/components/layout/LeftSidebar.svelte -->
 
<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let show: boolean;

	let windowWidth: number;
	let windowHeight: number;

	$: isVertical = windowHeight > windowWidth;
	$: sidebarWidthClass = isVertical ? 'w-1/2' : 'w-1/6';

	const nav = [
		{
			name: 'Writeups',
			children: [
				{
					name: 'TryHackMe',
					path: 'writeups/TryHackMe',
					children: [{ name: 'Blue', path: 'writeups/TryHackMe/Blue' }]
				}
			]
		},
		{
			name: 'Projects',
			children: [
				{ name: 'Clifford Benchmark', path: 'projects/CliffordBenchmark' }
			]
		}
	];

	function navigateAndAnimate(path: string) {
		dispatch('turnMore'); // trigger animation
		const formattedPath = path.startsWith('/') ? path : '/' + path;
		goto(`${base}${formattedPath}`);
	}

</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#if show}
	<div
		transition:fly={{ x: -100, duration: 400, delay: 200 }}
		class="pointer-events-auto absolute left-0 top-16 bottom-0 flex flex-col justify-start p-6 text-slate-100 {sidebarWidthClass}"
	>
		<nav>
			{#each nav as section}
				<details>
				<summary>{section.name}</summary>
				{#each section.children as child}
					<details>
					<summary>
						<button on:click={() => navigateAndAnimate(child.path)}>
						{child.name}
						</button>
					</summary>
					{#if child.children}
						{#each child.children as sub}
						<button class="ml-6" on:click={() => navigateAndAnimate(sub.path)}>
							{sub.name}
						</button>
						{/each}
					{/if}
					</details>
				{/each}
				</details>
			{/each}
		</nav>
	</div>
{/if}
