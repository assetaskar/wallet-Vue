import getUserId from "../../utils/getUserId";

const defaultCategories = [
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
	{
		name: "Другое",
		color: "#ff5252",
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
		totalExpenses(state) {
			return state.data.reduce((acc, cur) => acc + cur.amount, 0);
		},
	},

	mutations: {
		UPDATE_DATA(state, data) {
			state.data = data;
		},
		UPDATE_CATEGORIES(state) {
			const data = JSON.parse(localStorage.getItem(`expenses-categories-${getUserId()}`));
			state.categories = data || defaultCategories;
		},
		DELETE_CATEGORY(state, payload) {
			state.categories.splice(payload.index, 1);
			state.data.forEach(item => {
				if (item.category === payload.name) {
					item.category = "Другое";
				}
			});
			localStorage.setItem(`expenses-categories-${getUserId()}`, JSON.stringify(state.categories));
			localStorage.setItem(`expenses-${getUserId()}`, JSON.stringify(state.data));
		},
		ADD_CATEGORY(state, category) {
			if (~state.categories.findIndex(cat => cat.name === newCategory.name)) {
				throw new Error("Категория с жанным именем уже существует");
			}
			state.categories.unshift(category);
			localStorage.setItem(`expenses-categories-${getUserId()}`, JSON.stringify(state.categories));
		},
	},
};
