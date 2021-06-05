import Vue from "vue";
import Vuex from "vuex";

import expenses from "./modules/expenses";
import incomes from "./modules/incomes";
import users from "./modules/users";

import getStartDayWeek from "../utils/getStartDayWeek";
import getUserId from "../utils/getUserId";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tabs: "expenses",
		filter: "week",
	},

	getters: {
		getData: state => {
			const data = state[state.tabs].data;

			switch (state.filter) {
				case "week":
					const startDayWeek = getStartDayWeek();

					return data.filter(
						item => startDayWeek <= Date.parse(item.date) && Date.parse(item.date) <= Date.now()
					);

				case "month":
					return data.filter(item => new Date().getMonth() === new Date(item.date).getMonth());

				case "year":
					return data.filter(
						item => new Date().getFullYear() === new Date(item.date).getFullYear()
					);

				default:
					return [];
			}
		},

		dataCollectionForBar: (state, getters) => {
			if (getters.getData.length) {
				let labels = [],
					data = [];

				switch (state.filter) {
					case "week":
						labels = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
						data = Array(7).fill(0);

						getters.getData.forEach(item => {
							const index = ~(new Date(item.date).getDay() - 1)
								? new Date(item.date).getDay() - 1
								: 6;
							data[index] += item.amount;
						});
						break;

					case "month":
						labels = [];
						data = Array(new Date().getMonthDays()).fill(0);

						for (let i = 0; i < new Date().getMonthDays(); i++) {
							if (i + 1 < 10) {
								labels[i] = "0" + (i + 1);
							} else {
								labels[i] = (i + 1).toString();
							}
						}

						getters.getData.forEach(item => {
							const index = new Date(item.date).getDate() - 1;
							data[index] += item.amount;
						});
						break;

					case "year":
						labels = Vue.material.locale.shortMonths;
						data = Array(12).fill(0);

						getters.getData.forEach(item => {
							const index = new Date(item.date).getMonth();
							data[index] += item.amount;
						});
						break;

					default:
						return {};
				}

				return {
					labels,
					datasets: [
						{
							data,
							backgroundColor:
								state.tabs === "incomes" ? "rgba(66, 165, 245, 0.1)" : "rgba(255, 82, 82, 0.1)",
							borderColor: state.tabs === "incomes" ? "#42a5f5" : "#ff5252",
							borderWidth: 2,
						},
					],
				};
			}

			return {};
		},

		dataCollectionForDoughnut: (state, getters) => {
			if (getters.getData.length) {
				let { labels, data, colors } = getters.getData.reduce(
					(obj, cur) => {
						const isHaveObj = obj.labels.indexOf(cur.category);

						if (~isHaveObj) {
							obj.data[isHaveObj] += cur.amount;
						} else {
							const indexCategory = state[state.tabs].categories.findIndex(
								item => item.name === cur.category
							);

							obj.labels.push(cur.category);
							obj.data.push(cur.amount);
							obj.colors.push(state[state.tabs].categories[indexCategory].color);
						}

						return obj;
					},
					{
						labels: [],
						data: [],
						colors: [],
					}
				);

				return {
					labels,
					datasets: [
						{
							data,
							backgroundColor: colors,
							borderColor: "#424242",
						},
					],
				};
			}

			return {};
		},

		total(state, getters) {
			const startAmount = getters["users/getActiveUserData"]?.startAmount;
			const incomes = getters["incomes/totalIncomes"];
			const expenses = getters["expenses/totalExpenses"];

			return startAmount + incomes - expenses || 0;
		},

		getCategories(state) {
			return state[state.tabs].categories.map(category => {
				return {
					value: category.name,
					text: category.name,
				};
			});
		},
	},

	mutations: {
		SET_FILTER(state, value) {
			state.filter = value;
		},
		SET_TABS(state, value) {
			state.tabs = value;
		},
		ADD_DATA(state, data) {
			state[state.tabs].data.push(data);
			const newData = state[state.tabs].data.sort((a, b) => a.date > b.date);
			localStorage.setItem(`${state.tabs}-${getUserId()}`, JSON.stringify(newData));
		},
		EDIT_DATA(state, value) {
			const data = state[state.tabs].data.map(function(item) {
				if (item.id === this.id) {
					return this;
				}
				return item;
			}, value);

			localStorage.setItem(`${state.tabs}-${getUserId()}`, JSON.stringify(data));
			state[state.tabs].data = data;
		},
		DELETE_DATA(state, id) {
			const index = state[state.tabs].data.findIndex(item => item.id === id);
			state[state.tabs].data.splice(index, 1);

			localStorage.setItem(`${state.tabs}-${getUserId()}`, JSON.stringify(state[state.tabs].data));
		},
		EDIT_CATEGORY(state, data) {
			const prev = data.prev;
			let index = state.expenses.categories.findIndex(category => category.name === prev);
			if (~index) {
				state.expenses.categories.splice(index, 1, data.next);
				state.expenses.data.forEach(item => {
					if (item.category === prev) {
						item.category = data.next.name;
					}
				});
				localStorage.setItem(`expenses-${getUserId()}`, JSON.stringify(state.expenses.data));
				localStorage.setItem(
					`expenses-categories-${getUserId()}`,
					JSON.stringify(state.expenses.categories)
				);
				return;
			}
			index = state.incomes.categories.findIndex(category => category.name === prev);
			if (~index) {
				state.incomes.categories.splice(index, 1, data.next);
				localStorage.setItem(`incomes-${getUserId()}`, JSON.stringify(state.incomes.data));
				localStorage.setItem(
					`incomes-categories-${getUserId()}`,
					JSON.stringify(state.incomes.categories)
				);
				return;
			}
			throw new Error("Категория не найдено");
		},
	},

	actions: {
		deleteCategory({ commit, state }, name) {
			let index = state.expenses.categories.findIndex(category => category.name === name);
			if (~index) {
				commit("expenses/DELETE_CATEGORY", { name, index });
				return;
			}
			index = state.incomes.categories.findIndex(category => category.name === name);
			if (~index) {
				commit("incomes/DELETE_CATEGORY", { name, index });
				return;
			}
			throw new Error("Категория не найдено");
		},
	},

	modules: {
		expenses,
		incomes,
		users,
	},
});
