import Vue from "vue";

export default {
	namespaced: true,
	state: {
		data: [
			{
				id: 1619846130160,
				date: "2021-04-24T18:00:00.000Z",
				category: "Транспорт",
				amount: 160,
				comment: "Gorod-Maikuduk",
			},
			{
				id: 1619846130170,
				date: "2021-04-30T18:00:00.000Z",
				category: "Транспорт",
				amount: 400,
				comment: "Gorod-Maikuduk",
			},
			{
				id: 1619846130171,
				date: "2021-05-01T18:00:00.000Z",
				category: "Семья",
				amount: 4000,
				comment: "",
			},
			{
				id: 1619846130173,
				date: "2021-05-02T18:00:00.000Z",
				category: "Кафе",
				amount: 1500,
				comment: "Coffee, Tea, Meat",
			},
			{
				id: 1619846130180,
				date: "2021-05-02T18:00:00.000Z",
				category: "Транспорт",
				amount: 1000,
				comment: "Такси",
			},
			{
				id: 1619846130280,
				date: "2021-05-03T18:00:00.000Z",
				category: "Спорт",
				amount: 1550,
				comment: "Велозапчасти",
			},
			{
				id: 1619846130282,
				date: "2021-05-03T18:00:00.000Z",
				category: "Образование",
				amount: 2800,
				comment: "Книга",
			},
			{
				id: 1619846130285,
				date: "2021-05-03T18:00:00.000Z",
				category: "Подарки",
				amount: 6000,
				comment:
					'это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века.',
			},
		],
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

	mutations: {},
};
