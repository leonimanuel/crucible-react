export default function userReducer(state = {
	isLoggedIn: false,
	userEmail: "none"
}, action) {
	switch (action.type) {
		case "ADD_USER":
			console.log(action.user.email)
			return {
				isLoggedIn: true, //necessary?
				userEmail: action.user.email
			}

		default:
			return state;
	}
};

// export default userReducer;