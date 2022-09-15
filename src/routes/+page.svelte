<script lang="ts">
	import { combined } from '../stores/combined';
	import { goals } from '../stores/goals';
	import { months } from '$lib/months';
	import { positions } from '../stores/positions';
	import { selected } from '../stores/selected';
	import Calendar from '../components/Calendar.svelte';

	let input: HTMLInputElement;

	// selected is a store of a store
	$: goal = $selected;

	$: selectedMonth = months[$positions[goals.indexOf(goal)]];

	// calls .focus when goal changes
	$: goal && input?.focus();
</script>

<section>
	<div class="input-container">
		<input bind:this={input} bind:value={$goal} placeholder="Enter goal for {selectedMonth}" />
	</div>

	<Calendar />
</section>

<details>
	<summary>Show data</summary>
	<pre>
{JSON.stringify($combined, null, 2)}
	</pre>
</details>

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
