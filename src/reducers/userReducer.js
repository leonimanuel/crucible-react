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

		case "UPDATE_TOPIC":
			console.log(action.fact.id)
			//find
			// ...state.topics.filter(topic => topic.ancestry === state.parentTopic.ancestry)
			return {
				...state,
				parentTopic: {
					...state.parentTopic, 
					facts: state.parentTopic.facts.filter(fact => fact.id !== action.fact.id)
				}
			}
			
		default:
			return state;
	}
};

// export default userReducer;