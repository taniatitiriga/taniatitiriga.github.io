<!-- src/lib/components/Scene.svelte -->
<script lang="ts">
	import { onMount, onDestroy, createEventDispatcher } from 'svelte';
	import * as THREE from 'three';
	import { gsap } from 'gsap';

	const dispatch = createEventDispatcher();

	let canvas: HTMLCanvasElement;
	let cube: THREE.Mesh;

	function createRotationTween(target: object, properties: gsap.TweenVars) {
		return gsap.to(target, {
			...properties,
			onStart: () => {
                dispatch('animationstart');
            },
            onComplete: () => {
                dispatch('animationend');
            }
		});
	}

	export function rotateByAngle(angle: number) {
		if (!cube) return;
		createRotationTween(cube.rotation, {
			y: cube.rotation.y + angle,
			duration: 0.8,
			ease: 'power2.inOut'
		});
	}

	export function rotateToAngle(angle: number) {
		if (!cube) return;
		createRotationTween(cube.rotation, {
			y: angle,
			duration: 1.2,
			ease: 'power3.inOut'
		});
	}

	onMount(() => {
		const aspect = window.innerWidth / window.innerHeight;
		const frustumSize = 1 / aspect;

		const camera = new THREE.OrthographicCamera(
			1 / -2,
			1 / 2,
			frustumSize / 2,
			frustumSize / -2,
			0.1,
			1000
		);
		camera.position.z = 2;

		camera.position.y = 0;

		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);

		const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		// ambient light
		const ambientLight = new THREE.AmbientLight(0xd4d1ba, 1);
		scene.add(ambientLight);

		// top light
		const lightTop = new THREE.DirectionalLight(0xa2a7f5, 0.3);
		lightTop.position.set(0, 5, 5);
		lightTop.lookAt(0, 0, 0);
		scene.add(lightTop);

		// left light
		const lightLeft = new THREE.DirectionalLight(0x86cc83, 1);
		lightLeft.position.set(-4, 4, 3);
		lightLeft.lookAt(0, 0, 0);
		scene.add(lightLeft);

		// right light
		const lightRight = new THREE.DirectionalLight(0xcba9e8, 1);
		lightRight.position.set(4, 4, 3);
		lightRight.lookAt(0, 0, 0);
		scene.add(lightRight);

		const geometry = new THREE.BoxGeometry(1, 1, 1);

		const material = new THREE.MeshPhysicalMaterial({
			color: 0x141b3d,
			metalness: 0.2,
			roughness: 0.65,
			clearcoat: 0.8,
			clearcoatRoughness: 0.7,
			sheen: 0.7,
			sheenColor: new THREE.Color(0x11143d),
			transmission: 0.0 // solid
			});


		cube = new THREE.Mesh(geometry, material);
		scene.add(cube);

		cube.rotation.x = 0.05;

		scene.add(cube);

		const animate = () => {
			requestAnimationFrame(animate);
			renderer.render(scene, camera);
		};
		animate();

		const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const aspect = width / height;
            const frustumSize = 1;

            // orthographic camera bounds
            camera.left = -frustumSize * aspect / 2;
            camera.right = frustumSize * aspect / 2;
            camera.top = frustumSize / 2;
            camera.bottom = -frustumSize / 2;
            camera.updateProjectionMatrix();

            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // screen pixels to world units
            const unitPerPixel = frustumSize / height;

            const baseSize = width * unitPerPixel;
            const prismHeight = height * unitPerPixel;

            // cube scale — square base, full screen height
            cube.scale.set(baseSize, prismHeight, baseSize);

            // rotation curve
            const minRotation = 0.05;
            const maxRotation = 2.25;
            const scaleFactor = 130; // Tune this for your feel

            // inverse proportional rotation
            const rawRotation = scaleFactor / window.innerWidth;
            const clampedRotation = Math.min(Math.max(rawRotation, minRotation), maxRotation);

            cube.rotation.x = clampedRotation;

        };

		window.addEventListener('resize', handleResize);

		onDestroy(() => {
			window.removeEventListener('resize', handleResize);
			gsap.killTweensOf(cube.rotation);
			renderer.dispose();
			geometry.dispose();
			material.dispose();
			ambientLight.dispose();
			lightLeft.dispose();
			lightTop.dispose();
			lightRight.dispose();
		});
    handleResize();
	});
</script>

<canvas bind:this={canvas} class="fixed left-0 top-0 -z-10"></canvas>
