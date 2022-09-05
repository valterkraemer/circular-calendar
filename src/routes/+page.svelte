<script lang="ts">
	import { monthName } from '$lib/months';

	import Calendar, { type Goals } from '../components/Calendar.svelte';

	let goals: Goals = ['', '', '', '', '', '', '', '', '', '', '', ''];
	let selectedGoalIndex = 0;
</script>

<input
	bind:value={goals[selectedGoalIndex]}
	placeholder="Enter goal for {monthName(selectedGoalIndex)}"
/>

<Calendar {goals} bind:selectedGoalIndex />

<style>
	input {
		display: block;
		margin: auto;

		margin-bottom: 2rem;
	}
</style>
