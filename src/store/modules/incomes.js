export default {
	namespaced: true,
	state: {
		data: [
			{
				id: 1620217879562,
				date: "2021-04-30T18:00:00.000Z",
				category: "Зарплата",
				amount: 250000,
				comment: "IT",
			},
			{
				id: 1620217879582,
				date: "2021-05-02T18:00:00.000Z",
				category: "Подарок",
				amount: 50000,
				comment: "Свадьба",
			},
		],
		categories: [
			{
				name: "Зарплата",
				color: "tomato",
			},
			{
				name: "Проценты по вкладу",
				color: "goldenrod",
			},
			{
				name: "Подарок",
				color: "lightblue",
			},
		],
	},
};
