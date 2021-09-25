import Vue from "vue";
import Vuex from "vuex";

import expenses from "@/store/modules/expenses";
import incomes from "@/store/modules/incomes";
import users from "@/store/modules/users";
import * as getters from "@/store/getters";

import getUserId from "@/utils/getUserId";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tabs: "expenses",
		filter: "week",
	},

	getters,

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
				state.incomes.data.forEach(item => {
					if (item.category === prev) {
						item.category = data.next.name;
					}
				});
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
