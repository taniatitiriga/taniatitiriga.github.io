<!-- src/routes/+page.svelte -->
<script lang="ts">
	import Scene from '$lib/components/Scene.svelte';

	let sceneComponent: Scene;
	let isAnimating = false;

	// State for the rotation toggle
	let turnedState: 'none' | 'left' | 'right' = 'none';

	// State for the extra "75° more" button
	let show75ButtonFor: 'none' | 'left' | 'right' = 'none';

	// Handle top-left button toggle (rotate left)
	function handleTopLeftToggle() {
		show75ButtonFor = 'none';

		const wasTurnedLeft = turnedState === 'left';

		sceneComponent.rotateByAngle(
			wasTurnedLeft ? -getRotationAmount('15') : getRotationAmount('15')
		);

		turnedState = wasTurnedLeft ? 'none' : 'left';
	}

	// Handle top-right button toggle (rotate right)
	function handleTopRightToggle() {
		show75ButtonFor = 'none';

		const wasTurnedRight = turnedState === 'right';

		sceneComponent.rotateByAngle(
			wasTurnedRight ? getRotationAmount('15') : -getRotationAmount('15')
		);

		turnedState = wasTurnedRight ? 'none' : 'right';
	}

	// 75° More buttons
	function handleMiddleLeftClick() {
		sceneComponent.rotateByAngle(getRotationAmount('75'));
		show75ButtonFor = 'none';
		turnedState = 'none';
	}

	function handleMiddleRightClick() {
		sceneComponent.rotateByAngle(-getRotationAmount('75'));
		show75ButtonFor = 'none';
		turnedState = 'none';
	}

	// Center button resets everything
	function handleCenterClick() {
		sceneComponent.rotateToAngle(0);
		turnedState = 'none';
		show75ButtonFor = 'none';
	}

	// Dynamically returns rotation amount (in radians)
	function getRotationAmount(base: '15' | '75'): number {
		const isVertical = window.innerHeight > window.innerWidth;

		if (isVertical) {
			// On vertical screens, use 45° for both cases
			return Math.PI / 4;
		}

		// On landscape screens: 15° or 75°
		return base === '15' ? Math.PI / 12 : (5 * Math.PI) / 12;
	}
</script>

<Scene
	bind:this={sceneComponent}
	on:animationstart={() => (isAnimating = true)}
	on:animationend={() => {
		isAnimating = false;
		show75ButtonFor = turnedState;
	}}
/>

<div class="pointer-events-none absolute inset-0 text-slate-800">
	<button
		on:click={handleTopLeftToggle}
		disabled={isAnimating || turnedState === 'right'}
		class="pointer-events-auto absolute left-4 top-3 rounded-md px-6 py-3 text-2xl text-[#b1babd] transition-all hover:text-white disabled:opacity-50 bg-transparent"
	>
		{#if turnedState === 'left'}
			<!-- FontAwesome X icon -->
			<i class="fas fa-xmark"></i>
		{:else}
			<!-- FontAwesome hamburger icon -->
			<i class="fas fa-bars"></i>
		{/if}
		</button>


	<!-- Top Right Button -->
	<button
		on:click={handleTopRightToggle}
		disabled={isAnimating || turnedState === 'left'}
		class="pointer-events-auto absolute right-4 top-3 rounded-md px-6 py-3 text-2xl text-[#b1babd] transition-all hover:text-white disabled:opacity-50 bg-transparent"
	>
		{#if turnedState === 'right'}
			<!-- X icon -->
			<i class="fas fa-xmark"></i>
		{:else}
			<!-- Hamburger icon -->
			<i class="fas fa-user"></i>
		{/if}
	</button>



	<!-- Center Button -->
	<button
		on:click={handleCenterClick}
		disabled={isAnimating}
		class="pointer-events-auto absolute left-1/2 top-4 -translate-x-1/2 rounded-md px-4 py-2 text-white text-3xl transition-all hover:opacity-80 disabled:opacity-50"
		style="font-family: 'Amatic SC', cursive; background-color: transparent;"
	>
		TANIUSCA
	</button>


	<!-- Middle Left "75° More" Button -->
	{#if show75ButtonFor === 'left'}
		<button
			on:click={handleMiddleLeftClick}
			disabled={isAnimating}
			class="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 rounded-md bg-black/10 px-4 py-2 text-[#b1babd] backdrop-blur-sm transition-all hover:bg-black/20 disabled:opacity-50"
		>
			Turn 75° More
		</button>
	{/if}

	<!-- Middle Right "75° More" Button -->
	{#if show75ButtonFor === 'right'}
		<button
			on:click={handleMiddleRightClick}
			disabled={isAnimating}
			class="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 rounded-md bg-black/10 px-4 py-2 text-[#b1babd] backdrop-blur-sm transition-all hover:bg-black/20 disabled:opacity-50"
		>
			Turn 75° More
		</button>
	{/if}

</div>
