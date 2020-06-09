export default function userReducer(state = {
	isLoggedIn: false,
	userEmail: "none",
	topics: [],
	facts: [],
}, action) {
	console.log(action)
	switch (action.type) {
		case "LOG_IN":
			return {
				isLoggedIn: true, //necessary?
				userEmail: action.user.email,
				categories: action.user.topics,
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