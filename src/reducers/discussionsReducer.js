export default function discussionsReducer(state = {
	comments: [],
	discussion: "",
	loading: false,

}, action) {
		// debugger
		console.log("executing discussionsReducer")
		switch (action.type) {
			case "LOADING_DISCUSSION":
				return {
					...state,
					loading: true
				}

			case "ADD_DISCUSSION":
				return {
					...state,
					loading: false,
					discussion: action.discussionData,
					comments: action.discussionData.comments
				}

			// case "POSTING_DISCUSSION"

			case "ADD_COMMENT":
				// debugger
				return {
					...state,
					comments: [...state.comments, action.comment]
				}

			default:
				return state;	
		}
}
