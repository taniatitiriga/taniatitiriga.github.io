<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import '../app.css';
	import Scene from '$lib/components/Scene.svelte';
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import LeftSidebar from '$lib/components/layout/LeftSidebar.svelte';
	import RightSidebar from '$lib/components/layout/RightSidebar.svelte';

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
		// This check needs to be client-side only
		if (typeof window === 'undefined') return 0;

		const isVertical = window.innerHeight > window.innerWidth;
		if (isVertical) {
			return Math.PI / 4; // 45°
		}
		return base === '15' ? Math.PI / 12 : (5 * Math.PI) / 12; // 15° or 75°
	}
</script>

<!-- The 3D Scene is the background for the entire app -->
<Scene
	bind:this={sceneComponent}
	on:animationstart={() => (isAnimating = true)}
	on:animationend={() => {
		isAnimating = false;
		show75ButtonFor = turnedState;
	}}
/>

<!-- 
  This div acts as the UI layer. 
  'pointer-events-none' lets clicks pass through empty areas.
  Components inside will have 'pointer-events-auto' to be clickable.
-->
<div class="pointer-events-none absolute inset-0 text-slate-800">
	<Navbar
		{isAnimating}
		{turnedState}
		on:toggleLeft={handleTopLeftToggle}
		on:toggleRight={handleTopRightToggle}
		on:reset={handleCenterClick}
	/>

	<LeftSidebar
		show={show75ButtonFor === 'left'}
		{isAnimating}
		on:turnMore={handleMiddleLeftClick}
	/>

	<RightSidebar
		show={show75ButtonFor === 'right'}
		{isAnimating}
		on:turnMore={handleMiddleRightClick}
	/>

	<!-- The main content of the current page will be rendered here -->
	<main class="relative z-10 p-4">
		<slot />
	</main>
</div>