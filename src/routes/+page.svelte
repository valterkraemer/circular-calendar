<script lang="ts">
	import { monthName } from '$lib/months';

	import Calendar, { type Goals } from '../components/Calendar.svelte';

	let goals: Goals = ['', '', '', '', '', '', '', '', '', '', '', ''];
	let selectedGoalIndex = 0;

	let input: HTMLInputElement;

	$: {
		selectedGoalIndex; // Added as dependency, calls .focus when this changes
		input?.focus();
	}
</script>

<section>
	<div class="input-container">
		<input
			bind:this={input}
			bind:value={goals[selectedGoalIndex]}
			placeholder="Enter goal for {monthName(selectedGoalIndex)}"
		/>
	</div>

	<Calendar {goals} bind:selectedGoalIndex />
</section>

<style>
	section {
		padding: 1rem;
	}

	.input-container {
		display: flex;
		justify-content: center;
		margin: auto;
	}

	input {
		font-size: 1.5rem;
		padding: 0.25em;
	}
</style>
