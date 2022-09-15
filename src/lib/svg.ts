export const CIRCLE_RADIUS = 50;
export const CIRCLE_STROKE_WIDTH = 0.5;
export const TEXT_HEIGHT = 10;
export const SVG_RADIUS = TEXT_HEIGHT + CIRCLE_STROKE_WIDTH / 2 + CIRCLE_RADIUS;

export const FULL_ROTATION = 360;
export const SLICES = 12;
export const SLICE_DEG = FULL_ROTATION / SLICES;

export function getCirclePathD() {
	return `
        M ${SVG_RADIUS - CIRCLE_RADIUS} ${SVG_RADIUS}
        a ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 1 ${CIRCLE_RADIUS * 2} 0
        a ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 1 -${CIRCLE_RADIUS * 2} 0
    `;
}

function getCoordinates(deg: number) {
	const radians = deg * (Math.PI / 180);

	const x = SVG_RADIUS + Math.cos(radians) * CIRCLE_RADIUS;
	const y = SVG_RADIUS + Math.sin(radians) * CIRCLE_RADIUS;

	return [x, y];
}

function getSlicePathD() {
	const [startX, startY] = getCoordinates(-SLICE_DEG / 2);
	const [endX, endY] = getCoordinates(SLICE_DEG / 2);

	return `
        M ${startX} ${startY}
        A ${CIRCLE_RADIUS} ${CIRCLE_RADIUS} 0 0 1 ${endX} ${endY}
        L ${SVG_RADIUS} ${SVG_RADIUS}Z
    `;
}

export const circlePathD = getCirclePathD();
export const slicePathD = getSlicePathD();
