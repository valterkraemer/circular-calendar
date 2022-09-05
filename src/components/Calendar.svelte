<script lang="ts">
	import { monthName } from '$lib/months';

	export let goals: string[];
	export let selectedGoalIndex: number;

	let draggingIndex: number | undefined;
	let dragoverIndex: number | undefined;

	function handleDrop() {
		if (draggingIndex === undefined || dragoverIndex === undefined) {
			return;
		}

		const draggingText = goals[draggingIndex];
		goals[draggingIndex] = goals[dragoverIndex];
		goals[dragoverIndex] = draggingText;

		// Feels natural to have the dropped item selected
		selectedGoalIndex = dragoverIndex;
	}
</script>

<ol>
	{#each goals as goal, index}
		<li>
			<h2>{monthName(index)}</h2>
			<button
				draggable="true"
				class:dragover={index === dragoverIndex}
				class:selected={index === selectedGoalIndex}
				on:dragstart={() => (draggingIndex = index)}
				on:dragenter={() => (dragoverIndex = index)}
				on:dragover={(event) => {
					// To allow dropping
					event.preventDefault();
				}}
				on:dragleave={() => (dragoverIndex = undefined)}
				on:dragend={() => {
					draggingIndex = undefined;
					dragoverIndex = undefined;
				}}
				on:drop={handleDrop}
				on:click={() => (selectedGoalIndex = index)}
			>
				{goal}
			</button>
		</li>
	{/each}
</ol>

<style>
	ol {
		padding: 0;
		list-style: none;
		position: relative;
		width: 40rem;
		height: 40rem;
		margin: auto;
	}

	li {
		position: absolute;
		margin-left: -4rem;
		text-align: center;
	}

	li:nth-child(1) {
		top: 0;
		left: 50%;
	}

	li:nth-child(2) {
		top: 6.7%;
		left: 75%;
	}

	li:nth-child(3) {
		top: 25%;
		left: 93.3%;
	}

	li:nth-child(4) {
		top: 50%;
		left: 100%;
	}

	li:nth-child(5) {
		top: 75%;
		left: 93.3%;
	}

	li:nth-child(6) {
		top: 93.3%;
		left: 75%;
	}

	li:nth-child(7) {
		top: 100%;
		left: 50%;
	}

	li:nth-child(8) {
		top: 93.3%;
		left: 25%;
	}

	li:nth-child(9) {
		top: 75%;
		left: 6.7%;
	}

	li:nth-child(10) {
		top: 50%;
		left: 0;
	}

	li:nth-child(11) {
		top: 25%;
		left: 6.7%;
	}

	li:nth-child(12) {
		top: 6.7%;
		left: 25%;
	}

	h2 {
		position: absolute;
		top: -1.3em;
		left: 0;
		right: 0;
		text-align: center;
		font-weight: normal;
		font-size: 1.2rem;
		margin: 0;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 50%;
		width: 8rem;
		height: 8rem;
		text-align: center;
		border: 2px solid black;
		cursor: pointer;
		background-color: white;
		font-size: inherit;
	}

	.dragover {
		background-color: red;
	}

	.selected {
		border: 3px solid blue;
	}
</style>
