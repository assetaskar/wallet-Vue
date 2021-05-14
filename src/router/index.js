import Vue from "vue";
import VueRouter from "vue-router";
import Statistics from "../views/Statistics";
import Auth from "../views/Auth.vue";
import LayoutMain from "../layouts/LayoutMain";
import Settings from "../views/Settings";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "auth",
		component: Auth,
		beforeEnter: (to, from, next) => {
			console.log(localStorage.getItem("activeUserID"));
			localStorage.getItem("activeUserID")
				? next({
						name: "statistics",
						params: { userId: localStorage.getItem("activeUserID") },
				  })
				: next();
		},
	},
	{
		path: "/:userId",
		component: LayoutMain,
		children: [
			{
				path: "",
				name: "statistics",
				component: Statistics,
			},
			{
				path: "settings",
				name: "settings",
				component: Settings,
			},
		],
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
