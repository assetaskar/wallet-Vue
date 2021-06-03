export default {
	namespaced: true,
	state: {
		data: [],
		categories: [
			{
				name: "Зарплата",
				color: "#ff6347",
			},
			{
				name: "Проценты по вкладу",
				color: "#daa520",
			},
			{
				name: "Подарок",
				color: "#48929b",
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
		UPDATE_CATEGORIES(state, data) {
			state.categories = data;
		},
	},
};
