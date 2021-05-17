export default {
	namespaced: true,
	state: {
		usersAll: JSON.parse(localStorage.getItem("users")) || [],
		isSignIn: false,
	},

	getters: {
		getActiveUserData(state) {
			if (state.isSignIn)
				return state.usersAll.find(user => user.id === localStorage.getItem("activeUserId"));
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
};
