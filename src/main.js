import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Chart } from "chart.js";
import filterDateFormat from "./utils/filterDateFormat";

import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Chart.defaults.global.defaultFontColor = "white";
Chart.defaults.global.legend.labels.fontSize = 14;

Vue.filter("toLocaleDateString", filterDateFormat);

Vue.use(VueMaterial);

Vue.material.locale = {
	...Vue.material.locale,
	dateFormat: "dd/MM/yyyy",
	days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
	shortDays: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
	shorterDays: ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"],
	months: [
		"Январь",
		"Февраль",
		"Март",
		"Апрель",
		"Май",
		"Июнь",
		"Июль",
		"Август",
		"Сентябрь",
		"Октябрь",
		"Ноябрь",
		"Декабрь",
	],
	shortMonths: [
		"Янв",
		"Февр",
		"Март",
		"Апр",
		"Май",
		"Июнь",
		"Июль",
		"Авг",
		"Сент",
		"Окт",
		"Нояб",
		"Дек",
	],
	firstDayOfAWeek: 1,
	cancel: "Отмена",
};

Date.prototype.getMonthDays = function() {
	let d = new Date(this.getFullYear(), this.getMonth() + 1, 0);
	return d.getDate();
};

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
