import { FULL_ROTATION, SLICE_DEG } from './svg';
import { months } from './months';

const steps = months.map((_, i) => (i + 0.5) * SLICE_DEG);

export function positionFromAngle(deg: number) {
	// The first slice is -15deg to 15deg, this makes 355 to be in the first slice
	deg = deg % (FULL_ROTATION - SLICE_DEG / 2);

	return steps.findIndex((step) => deg < step);
}

export function angleForPosition(position: number) {
	return position * SLICE_DEG;
}
