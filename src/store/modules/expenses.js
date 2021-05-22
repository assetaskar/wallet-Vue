export default {
	namespaced: true,
	state: {
		data: [],
		categories: [
			{
				name: "Транспорт",
				color: "tomato",
			},
			{
				name: "Спорт",
				color: "goldenrod",
			},
			{
				name: "Семья",
				color: "lightblue",
			},
			{
				name: "Продукты",
				color: "cyan",
			},
			{
				name: "Подарки",
				color: "teal",
			},
			{
				name: "Образование",
				color: "coral",
			},
			{
				name: "Кафе",
				color: "lightgreen",
			},
			{
				name: "Дом",
				color: "grey",
			},
			{
				name: "Здоровье",
				color: "brown",
			},
			{
				name: "Досуг",
				color: "chocolate",
			},
		],
	},

	getters: {
		totalExpenses(state) {
			return state.data.reduce((acc, cur) => acc + cur.amount, 0);
		},
	},

	mutations: {
		UPDATE_DATA(state, data) {
			state.data = data;
		},
	},
};
