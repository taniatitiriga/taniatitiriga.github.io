<script lang="ts">
	import { fly } from 'svelte/transition';

	export let show: boolean;

	let windowWidth: number;
	let windowHeight: number;

	$: isVertical = windowHeight > windowWidth;

	$: sidebarWidthClass = isVertical ? 'w-1/2' : 'w-1/6';
</script>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

{#if show}
	<div
		in:fly={{ x: 100, duration: 600, delay: 300 }}
		out:fly={{ x: 100, duration: 400 }}
		class="pointer-events-auto absolute right-0 top-16 bottom-0 flex flex-col justify-center pl-6 py-10 pr-5 text-slate-100 {sidebarWidthClass}"
	>
		<div class="flex flex-col items-end">
			<h2 class="text-3xl text-white mb-5" style="font-family: 'Amatic SC', cursive;">Let's get in touch!<br/></h2>

			<a
				href="/CV_TaniaTitiriga.pdf"
				download
				target="_blank"
				rel="noopener noreferrer"
				class="text-xl mb-6 rounded-md bg-white/10 px-3 py-1 text-white transition-colors hover:bg-white/20"
			>
				Download CV
			</a>

			<div class="flex items-center justify-end gap-5 text-4xl">
				<a
					href="https://github.com/taniatitiriga"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-white"
					aria-label="GitHub"
				>
					<i class="fa-brands fa-github"></i>
				</a>
				<a
					href="https://www.linkedin.com/in/tania-titiriga/"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-white"
					aria-label="LinkedIn"
				>
					<i class="fa-brands fa-linkedin"></i>
				</a>
				<a
					href="https://x.com/tania_titiriga"
					target="_blank"
					rel="noopener noreferrer"
					class="transition-colors hover:text-white"
					aria-label="Twitter"
				>
					<i class="fa-brands fa-twitter"></i>
				</a>
			</div>
		</div>
	</div>
{/if}