import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { Chart } from "chart.js";

// import { MdButton, MdContent, MdTabs } from "vue-material/dist/components";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";

Chart.defaults.global.defaultFontColor = "white";
Chart.defaults.global.legend.labels.fontSize = 14;

// Vue.use(MdButton);
// Vue.use(MdContent);
// Vue.use(MdTabs);
Vue.use(VueMaterial);

Vue.material.locale = {
	...Vue.material.locale,
	dateFormat: "dd/MM/yyyy",
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
	firstDayOfAWeek: 1,
};

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount("#app");
