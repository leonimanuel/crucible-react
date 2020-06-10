export default function userReducer(state = {
	isLoggedIn: false,
	userEmail: "none",
	topics: [],
	facts: [],
	parentTopic: ""
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

		case "ADD_TOPICS":
			console.log("adding topic")
			return {
				...state,
				topics: action.topics
			}

		case "SELECT_TOPIC":
			console.log("setting parent topic")
			return {
				...state,
				parentTopic: action.topic		
			}
			
		default:
			return state;
	}
};

// export default userReducer;