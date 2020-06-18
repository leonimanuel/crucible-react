export default function topicsReducer(state = {
	topics: [],
	b: ""
}, action) {
	switch (action.type) {
		case "ADD_TOPICS":
			debugger
			console.log("adding topics")
			return {
				...state,
				topics: action.topics
			}

		default:
			return state;
	}
}