<script lang="ts">
    import '../app.css';
    import Scene from '$lib/components/Scene.svelte';
    import Navbar from '$lib/components/layout/Navbar.svelte';
    import LeftSidebar from '$lib/components/layout/LeftSidebar.svelte';
    import RightSidebar from '$lib/components/layout/RightSidebar.svelte';
    import { goto } from '$app/navigation';
    import { base } from '$app/paths';
    import { page } from '$app/stores';
    import { onDestroy } from 'svelte';

    let sceneComponent: Scene;
    let isAnimating = false;
    let turnedState: 'none' | 'left' | 'right' = 'none';
    let isContentVisible = true;
    let windowWidth: number;
    let windowHeight: number;
    let resolveAnimationPromise: (() => void) | null = null;
    let currentPathname: string;
    let basePath: string;

    // current path and base (not important anymore)
    const unsubscribePage = page.subscribe((p) => {
        currentPathname = p.url.pathname;
        basePath = p.data.base || '';
    });
    onDestroy(unsubscribePage);

    // orientation based on sidebars
    $: isVertical = windowHeight > windowWidth;
    $: mainClass = (() => {
        const baseClass ='pointer-events-auto absolute top-[15%] bottom-4 z-30 transition-all duration-500';
        if (turnedState === 'left') {
            return `${baseClass} left-4 ${isVertical ? 'right-4 ml-[50%]' : 'right-4 ml-[16.66%]'}`;
        }
        if (turnedState === 'right') {
            return `${baseClass} right-4 ${isVertical ? 'left-4 mr-[50%]' : 'left-4 mr-[16.66%]'}`;
        }
        return `${baseClass} left-4 right-4`;
    })();

    // reset and animation for home button
    async function handleReset() {
        if (currentPathname === basePath + '/') return;
        isContentVisible = false;
        sceneComponent.rotateToAngle(0);
        turnedState = 'none';
        await new Promise<void>((resolve) => {
            resolveAnimationPromise = resolve;
        });
        await goto(`${base}/`);
        isContentVisible = true;
    }

    // animation for accessing page from sidebar (cube turning)
    async function handleSidebarNavigation(event: CustomEvent<{ path: string }>) {
        const { path } = event.detail;
        isContentVisible = false;
        if (turnedState === 'left') {
            sceneComponent.rotateByAngle(getRotationAmount('75'));
            turnedState = 'none';
        }
        await new Promise<void>((resolve) => {
            resolveAnimationPromise = resolve;
        });
        await goto(`${base}/${path}`);
        isContentVisible = true;
    }

    // opening left sidebar animation
    function handleTopLeftToggle() {
        const wasTurnedLeft = turnedState === 'left';
        sceneComponent.rotateByAngle(
            wasTurnedLeft ? -getRotationAmount('15') : getRotationAmount('15')
        );
        turnedState = wasTurnedLeft ? 'none' : 'left';
    }

    // same for right sidebar
    function handleTopRightToggle() {
        const wasTurnedRight = turnedState === 'right';
        sceneComponent.rotateByAngle(
            wasTurnedRight ? getRotationAmount('15') : -getRotationAmount('15')
        );
        turnedState = wasTurnedRight ? 'none' : 'right';
    }

    // turning more for right sidebar (maybe use it later?)
    function handleMiddleRightClick() {
        sceneComponent.rotateByAngle(-getRotationAmount('75'));
        turnedState = 'none';
    }

    // compute rotation angle phone/web
    function getRotationAmount(base: '15' | '75'): number {
        if (typeof window === 'undefined') return 0;
        if (isVertical) return Math.PI / 4;
        return base === '15' ? Math.PI / 12 : (5 * Math.PI) / 12;
    }
</script>

<svelte:head>
    <title>Taniusca - Blog</title>
</svelte:head>

<!-- track window size -->
<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />

<!-- cube bg animations -->
<Scene
    bind:this={sceneComponent}
    on:animationstart={() => (isAnimating = true)}
    on:animationend={() => {
        isAnimating = false;
        if (resolveAnimationPromise) {
            resolveAnimationPromise();
            resolveAnimationPromise = null;
        }
    }}
/>

<!-- overlay UI: nav, sidebars and content -->
<div class="pointer-events-none absolute inset-0">
    <Navbar
        {isAnimating}
        {turnedState}
        on:toggleLeft={handleTopLeftToggle}
        on:toggleRight={handleTopRightToggle}
        on:reset={handleReset}
    />

    <LeftSidebar show={turnedState === 'left'} on:navigate={handleSidebarNavigation} />

    <RightSidebar show={turnedState === 'right'} on:turnMore={handleMiddleRightClick} />

    <main class={mainClass}>
        {#if isContentVisible}
            <slot />
        {/if}
    </main>
</div>