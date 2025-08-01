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
		transition:fly={{ x: 100, duration: 400, delay: 200 }}
		class="pointer-events-auto absolute right-0 top-16 bottom-0 flex flex-col justify-center p-10 text-slate-100 {sidebarWidthClass}"
	>
		<div class="flex flex-col items-end">
			<h2 class="text-3xl text-white" style="font-family: 'Amatic SC', cursive;">About me</h2>

			<p class="text-xl my-4 ml-5 text-right">
				I'm Tania, a computer science student passionate about cryptography and cybersecurity in general. <br/><br/>
				Let's get in touch!
			</p>

			<a
				href="/CV_TaniaTitiriga.pdf"
				download
				target="_blank"
				rel="noopener noreferrer"
				class="text-xl mb-6 rounded-md bg-white/10 px-5 py-2 text-white transition-colors hover:bg-white/20"
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