export default function discussionsReducer(state = {
	discussion: "",
	loading: false
}, action) {
		console.log("executing discussionsReducer")
		switch (action.type) {
			case "LOADING_DISCUSSION":
				return {
					...state,
					loading: true
				}

			case "ADD_DISCUSSION":
				return {
					loading: false,
					discussion: action.discussionData
				}

			default:
				return state;	
		}
}
