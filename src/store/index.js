import Vue from "vue";
import Vuex from "vuex";

import expenses from "./modules/expenses";
import incomes from "./modules/incomes";
import users from "./modules/users";

import getStartDayWeek from "../utils/getStartDayWeek";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tabs: "expenses",
		filter: "today",
	},

	getters: {
		getData: state => {
			const data = state[state.tabs].data;

			switch (state.filter) {
				case "today":
					return data.filter(
						item =>
							new Date(Date.parse(item.date)).toLocaleDateString() ===
							new Date().toLocaleDateString()
					);

				case "week":
					const startDayWeek = getStartDayWeek();

					return data.filter(
						item => startDayWeek <= Date.parse(item.date) && Date.parse(item.date) <= Date.now()
					);

				case "month":
					return data.filter(
						item => new Date().getMonth() === new Date(Date.parse(item.date)).getMonth()
					);

				case "year":
					return data.filter(
						item => new Date().getFullYear() === new Date(Date.parse(item.date)).getFullYear()
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
					case "today":
						({ labels, data } = getters.getData.reduce(
							(obj, cur) => {
								obj.labels.push(`${cur.category}`);
								obj.data.push(cur.amount);

								return obj;
							},
							{
								labels: [],
								data: [],
							}
						));
						break;

					case "week":
						let startDayWeek = getStartDayWeek();

						for (let i = 0; i < 7; i++) {
							labels[i] = new Date(startDayWeek).toLocaleDateString();
							data[i] = 0;
							startDayWeek += 86400000;
						}

						getters.getData.forEach(el => {
							const index = labels.indexOf(new Date(Date.parse(el.date)).toLocaleDateString());
							data[index] += el.amount;
						});
						break;

					case "month":
						({ labels, data } = getters.getData.reduce(
							(obj, cur) => {
								const date = new Date(Date.parse(cur.date)).toLocaleDateString();
								const index = obj.labels.indexOf(date);

								if (~index) {
									obj.data[index] += cur.amount;
								} else {
									obj.labels.push(new Date(Date.parse(cur.date)).toLocaleDateString());
									obj.data.push(cur.amount);
								}

								return obj;
							},
							{
								labels: [],
								data: [],
							}
						));
						break;

					case "year":
						labels = Vue.material.locale.months;
						data = Array(12).fill(0);

						getters.getData.forEach(item => {
							const index = new Date(Date.parse(item.date)).getMonth();
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
							backgroundColor: "rgba(255, 99, 132, 0.5)",
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
			const startAmount = getters["users/getActiveUserData"].startAmount;
			const incomes = getters["incomes/totalIncomes"];
			const expenses = getters["expenses/totalExpenses"];

			return startAmount + incomes - expenses;
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
		},
	},

	modules: {
		expenses,
		incomes,
		users,
	},
});
