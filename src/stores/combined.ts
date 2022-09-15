import { derived } from 'svelte/store';

import { goals } from './goals';
import { months, SHIFT_MONTHS } from '$lib/months';
import { positions } from './positions';

export const combined = derived([positions, ...goals], ([$positions, ...$goals]) => {
	const data = months.map((name, index) => {
		const positionIndex = $positions.findIndex((position) => position === index);

		return {
			name,
			goal: $goals[positionIndex]
		};
	});

	return [...data.slice(-SHIFT_MONTHS), ...data.slice(0, -SHIFT_MONTHS)];
});
