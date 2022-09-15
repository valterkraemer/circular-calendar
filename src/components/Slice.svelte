<script lang="ts">
	import { onMount } from 'svelte';
	import { spring } from 'svelte/motion';
	import type { Writable } from 'svelte/store';

	import { angleForPosition, positionFromAngle } from '$lib/angles';
	import { browser } from '$app/environment';
	import { CIRCLE_STROKE_WIDTH, FULL_ROTATION, slicePathD, SVG_RADIUS } from '$lib/svg';
	import { positions } from '../stores/positions';
	import { selected } from '../stores/selected';

	export let goal: Writable<string>;
	export let id: string;
	export let position: number;
	export let svg: SVGElement;

	const damping = 0.5;
	const stiffness = 0.08;

	let g: SVGGElement;
	let mousedownAngleOffset: number;
	let parentCenterX: number;
	let parentCenterY: number;

	const deg = spring(angleForPosition(position), {
		damping,
		stiffness
	});

	function getAngle(clientX: number, clientY: number) {
		const value = (Math.atan2(clientY - parentCenterY, clientX - parentCenterX) * 180) / Math.PI;

		if (value < 0) {
			return value + FULL_ROTATION;
		}

		return value;
	}

	function updateAngleToPosition(position: number) {
		const newAngle = angleForPosition(position);

		deg.update((current) => {
			const diff = current - newAngle;

			if (diff < -180) {
				return newAngle - FULL_ROTATION;
			} else if (diff > 180) {
				return newAngle + FULL_ROTATION;
			}

			return newAngle;
		});
	}

	function handleMousedown(event: MouseEvent) {
		selected.set(goal);

		deg.stiffness = 1;
		deg.damping = 1;

		const rect = svg.getBoundingClientRect();
		parentCenterX = rect.x + rect.width / 2;
		parentCenterY = rect.y + rect.height / 2;

		mousedownAngleOffset = getAngle(event.clientX, event.clientY) - angleForPosition(position);

		window.addEventListener('mousemove', handleMousemove);
		window.addEventListener('mouseup', handleMouseup);

		// Allow input to take focus
		event.preventDefault();
	}

	function handleMousemove(event: MouseEvent) {
		const newAngle = getAngle(event.clientX, event.clientY) - mousedownAngleOffset;

		deg.set(newAngle);
	}

	function handleMouseup(event: MouseEvent) {
		deg.damping = damping;
		deg.stiffness = stiffness;

		const newAngle = getAngle(event.clientX, event.clientY) % FULL_ROTATION;

		const targetPosition = positionFromAngle(newAngle);

		const moved = positions.swap(position, targetPosition);

		if (!moved) {
			updateAngleToPosition(position);
		}

		window.removeEventListener('mousemove', handleMousemove);
		window.removeEventListener('mouseup', handleMouseup);
	}

	onMount(() => {
		return () => {
			window.removeEventListener('mousemove', handleMousemove);
			window.removeEventListener('mouseup', handleMouseup);
		};
	});

	$: updateAngleToPosition(position);

	// Not ideal, but SVG children gets rendered in order regardless of z-index
	$: browser && $selected === goal && svg?.appendChild(g);
</script>

<!-- NOTE: id used in src/stores/positions.ts -->
<g bind:this={g} {id} style="transform: rotate({$deg}deg)" on:mousedown={handleMousedown}>
	<path d={slicePathD} class:selected={$selected === goal} />
	<text x={90} y={SVG_RADIUS + CIRCLE_STROKE_WIDTH} dominant-baseline="middle" text-anchor="middle">
		{$goal}
	</text>
</g>

<style>
	g {
		transform-origin: 50% 50%;
	}

	.selected {
		fill: #eee;
	}

	path {
		stroke: black;
		stroke-width: 0.5;
		fill: white;
		cursor: pointer;
	}

	text {
		text-anchor: middle;
		fill: black;
		font-size: 5px;
		pointer-events: none;
	}
</style>
