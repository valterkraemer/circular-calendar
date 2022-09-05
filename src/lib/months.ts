export function monthName(monthIndex: number) {
	const date = new Date();
	date.setMonth(monthIndex);

	return date.toLocaleString("en-US", {
		month: 'long'
	});
}
