const getStartDayWeek = () => () => {
	let startDayWeek = new Date();

	const dayWeek = new Date().getDay();

	dayWeek !== 0
		? startDayWeek.setDate(startDayWeek.getDate() - dayWeek + 1)
		: startDayWeek.setDate(startDayWeek.getDate() - 6);

	startDayWeek = new Date(startDayWeek.setHours(0, 0, 0, 0)).toJSON();
	startDayWeek = Date.parse(startDayWeek);

	return startDayWeek;
};

export default getStartDayWeek;
