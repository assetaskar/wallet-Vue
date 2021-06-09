import getUserId from "../../utils/getUserId";

const defaultCategories = [
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
	{
		name: "Другое",
		color: "#42a5f5",
		service: true,
	},
];

export default {
	namespaced: true,
	state: {
		data: [],
		categories: [],
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
		UPDATE_CATEGORIES(state) {
			const data = JSON.parse(localStorage.getItem(`incomes-categories-${getUserId()}`));
			state.categories = data || defaultCategories;
		},
		DELETE_CATEGORY(state, payload) {
			state.categories.splice(payload.index, 1);
			state.data.forEach(item => {
				if (item.category === payload.name) {
					item.category = "Другое";
				}
			});
			localStorage.setItem(`incomes-categories-${getUserId()}`, JSON.stringify(state.categories));
			localStorage.setItem(`incomes-${getUserId()}`, JSON.stringify(state.data));
		},
		ADD_CATEGORY(state, newCategory) {
			if (~state.categories.findIndex(cat => cat.name === newCategory.name)) {
				throw new Error("Категория с жанным именем уже существует");
			}
			state.categories.unshift(newCategory);
			localStorage.setItem(`incomes-categories-${getUserId()}`, JSON.stringify(state.categories));
		},
	},
};
