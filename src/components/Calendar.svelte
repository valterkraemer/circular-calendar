<script lang="ts">
	import { circlePathD, SLICE_DEG, SVG_RADIUS } from '$lib/svg';
	import { goals } from '../stores/goals';
	import { months } from '$lib/months';
	import { positions } from '../stores/positions';
	import MonthLabel from './MonthLabel.svelte';
	import Slice from './Slice.svelte';

	let svg: SVGElement;
</script>

<svg
	bind:this={svg}
	viewBox="0 0 {SVG_RADIUS * 2} {SVG_RADIUS * 2}"
	xmlns="http://www.w3.org/2000/svg"
>
	<path d={circlePathD} id="circlePath" />

	{#each months as month, index}
		<MonthLabel rotate={SLICE_DEG * index} targetPathId="#circlePath">{month}</MonthLabel>
	{/each}

	{#each goals as goal, index}
		<Slice id="slice-{index}" {svg} {goal} position={$positions[index]} />
	{/each}
</svg>

<style>
	svg {
		display: block;
		margin: auto;
		margin-top: 50px;
		width: 500px;
	}

	path {
		stroke: black;
		stroke-width: 0.5;
		fill: white;
		cursor: pointer;
	}
</style>
