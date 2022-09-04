<script lang="ts">
	import Calendar from '../components/Calendar.svelte';

	let goals = ['', '', '', '', '', '', '', '', '', '', '', ''];
	let selectedGoalIndex = 0;
</script>

<input bind:value={goals[selectedGoalIndex]} />

<Calendar {goals} bind:selectedGoalIndex />

<style>
	input {
		display: block;
		margin: auto;

		margin-bottom: 2rem;
	}
</style>