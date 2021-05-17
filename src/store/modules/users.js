export default {
	state: {
		usersAll: JSON.parse(localStorage.getItem("users")) || [],
	},
	mutation: {
		ADD_USER(state, user) {
			state.usersAll.push(user);
		},
	},
};
