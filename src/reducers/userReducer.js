export default function userReducer(state = {
	isLoggedIn: false,
	userEmail: "none",
	facts: []
}, action) {
	switch (action.type) {
		case "LOG_IN":
			return {
				isLoggedIn: true, //necessary?
				userEmail: action.user.email,
				facts: action.user.facts
			}
		
		case "LOG_OUT":
			return {
				isLoggedIn: false,
				userEmail: "none"
			}
			
		default:
			return state;
	}
};

// export default userReducer;