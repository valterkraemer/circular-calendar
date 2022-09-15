function monthName(monthIndex: number) {
	const date = new Date();
	date.setMonth(monthIndex);

	return date.toLocaleString('en-US', {
		month: 'long'
	});
}

// To make January come on the top
export const SHIFT_MONTHS = 3;

export const months: string[] = [];

for (let i = 0; i < 12; i++) {
	months.push(monthName((i + SHIFT_MONTHS) % 12));
}
