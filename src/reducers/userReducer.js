export default function userReducer(state = {
	isLoggedIn: false,
	userEmail: "none"
}, action) {
	switch (action.type) {
		case "ADD_USER":
			return {
				userEmail: action.email
			}

		default:
			return state;
	}
};

// export default userReducer;