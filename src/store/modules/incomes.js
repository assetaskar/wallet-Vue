export default {
	namespaced: true,
	state: {
		data: [],
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

	getters: {
		totalIncomes(state) {
			return state.data.reduce((acc, cur) => acc + cur.amount, 0);
		},
	},

	mutations: {
		UPDATE_DATA(state, data) {
			state.data = data;
		},
	},
};
