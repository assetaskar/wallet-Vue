import getUserId from "@/utils/getUserId";

export default {
	namespaced: true,
	state: {
		usersAll: JSON.parse(localStorage.getItem("users")) || [],
		isSignIn: false,
	},

	getters: {
		getActiveUserData(state) {
			if (state.isSignIn) return state.usersAll.find(user => user.id === getUserId());
		},
	},

	mutations: {
		ADD_USER(state, user) {
			state.usersAll.push(user);
		},
		IS_SIGN_IN(state) {
			!state.isSignIn && (state.isSignIn = true);
		},
		IS_SIGN_OUT(state) {
			state.isSignIn && (state.isSignIn = false);
		},
	},

	actions: {
		updateUserData({ commit }) {
			const expensesLocalData = JSON.parse(localStorage.getItem(`expenses-${getUserId()}`)) || [];
			const incomesLocalData = JSON.parse(localStorage.getItem(`incomes-${getUserId()}`)) || [];

			commit("expenses/UPDATE_DATA", expensesLocalData, { root: true });
			commit("incomes/UPDATE_DATA", incomesLocalData, { root: true });

			commit("expenses/UPDATE_CATEGORIES", null, { root: true });
			commit("incomes/UPDATE_CATEGORIES", null, { root: true });

			commit("IS_SIGN_IN");
		},
	},
};
