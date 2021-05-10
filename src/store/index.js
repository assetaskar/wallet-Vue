import Vue from "vue";
import Vuex from "vuex";
import expenses from "./modules/expenses";
import incomes from "./modules/incomes";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		date: new Date()
			.toLocaleDateString()
			.match(/\d+/g)
			.reverse()
			.map((date, index) =>
				index == 1 ? (date - 1 < 10 ? `0${date - 1}` : `${date - 1}`) : date
			)
			.join("."),
		tabs: "expenses",
		filter: "today",
		startDayWeek: () => {
			let startDayWeek = new Date();
			const dayWeek = new Date().getDay();
			dayWeek !== 0
				? startDayWeek.setDate(startDayWeek.getDate() - dayWeek + 1)
				: startDayWeek.setDate(startDayWeek.getDate() - 6);
			startDayWeek = new Date(startDayWeek.setHours(0, 0, 0, 0)).toJSON();
			startDayWeek = Date.parse(startDayWeek);
			return startDayWeek;
		},
	},
	mutations: {
		setFilter(state, value) {
			state.filter = value;
		},
		setTabs(state, value) {
			state.tabs = value;
		},
	},
	actions: {},
	modules: {
		expenses,
		incomes,
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
					const startDayWeek = state.startDayWeek();

					return data.filter(
						item =>
							startDayWeek <= Date.parse(item.date) &&
							Date.parse(item.date) <= Date.now()
					);

				case "month":
					return data.filter(
						item => new Date().getMonth() === new Date(Date.parse(item.date)).getMonth()
					);

				case "year":
					return data.filter(
						item =>
							new Date().getFullYear() ===
							new Date(Date.parse(item.date)).getFullYear()
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
						let startDayWeek = state.startDayWeek();

						for (let i = 0; i < 7; i++) {
							labels[i] = new Date(startDayWeek).toLocaleDateString();
							data[i] = 0;
							startDayWeek += 86400000;
						}

						getters.getData.forEach(el => {
							const index = labels.indexOf(
								new Date(Date.parse(el.date)).toLocaleDateString()
							);
							data[index] += el.amount;
						});
						break;

					case "month":
						({ labels, data } = getters.getData.reduce(
							(obj, cur) => {
								obj.labels.push(
									new Date(Date.parse(cur.date)).toLocaleDateString()
								);
								obj.data.push(cur.amount);

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
	},
});
