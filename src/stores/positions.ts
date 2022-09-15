import { get, writable } from 'svelte/store';

import { months } from '$lib/months';

export const positions = {
	...writable(months.map((_, i) => i)),
	swap: (position1: number, positions2: number) => {
		if (position1 === positions2) {
			return false;
		}

		const $positions = get(positions);

		const position1Index = $positions.findIndex((p) => p === position1);
		const positions2Index = $positions.findIndex((p) => p === positions2);

		const newPositions = $positions.slice();
		newPositions[position1Index] = $positions[positions2Index];
		newPositions[positions2Index] = $positions[position1Index];

		positions.set(newPositions);

		hackMovingSVGsToTop(position1Index, positions2Index);

		return true;
	}
};

// Not ideal, but SVGs does not use z-index and just render everything in order
function hackMovingSVGsToTop(sliceTopIndex: number, sliceSecondTopIndex: number) {
	const sliceTop = document.querySelector(`#slice-${sliceTopIndex}`)!;
	const svg = sliceTop!.closest('svg')!;
	const sliceSecondTop = svg.querySelector(`#slice-${sliceSecondTopIndex}`)!;

	svg.appendChild(sliceSecondTop);
	svg.appendChild(sliceTop);
}
