export default {
	namespaced: true,
	state: {
		usersAll: JSON.parse(localStorage.getItem("users")) || [],
	},
	getters: {
		getActiveUserData(state) {
			return state.usersAll.find(user => user.id === localStorage.getItem("activeUserId"));
		},
	},
	mutation: {
		ADD_USER(state, user) {
			state.usersAll.push(user);
		},
	},
};
