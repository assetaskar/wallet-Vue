export default {
	namespaced: true,
	state: {
		data: [],
		categories: [
			{
				name: "Транспорт",
				color: "#ff6347",
			},
			{
				name: "Спорт",
				color: "#daa520",
			},
			{
				name: "Семья",
				color: "#69849b",
			},
			{
				name: "Продукты",
				color: "#00FFFF",
			},
			{
				name: "Подарки",
				color: "#006864",
			},
			{
				name: "Образование",
				color: "#ff7f50",
			},
			{
				name: "Кафе",
				color: "#90ee90",
			},
			{
				name: "Дом",
				color: "#808080",
			},
			{
				name: "Здоровье",
				color: "#f2b9cc",
			},
			{
				name: "Досуг",
				color: "#887d8a",
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
		UPDATE_CATEGORIES(state, data) {
			state.categories = data;
		},
	},
};
