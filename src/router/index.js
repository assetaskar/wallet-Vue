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
			localStorage.getItem("activeUserId")
				? next({
						replace: true,
						name: "statistics",
						params: { userId: localStorage.getItem("activeUserId") },
				  })
				: next();
		},
	},
	{
		path: "/:userId",
		component: LayoutMain,
		beforeEnter: (to, from, next) => {
			if (!localStorage.getItem("activeUserId")) {
				next({
					replace: true,
					name: "auth",
				});
			} else if (localStorage.getItem("activeUserId") !== to.params.userId) {
				next({
					replace: true,
					name: "statistics",
					params: {
						userId: localStorage.getItem("activeUserId"),
					},
				});
			} else {
				next();
			}
		},
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
	{
		path: "*",
		redirect: {
			name: "auth",
		},
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
