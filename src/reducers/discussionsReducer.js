export default function discussionsReducer(state = {
	comments: [],
	addedNewComment: false,
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

			case "POSTING_DISCUSSION":
				debugger
				return {
					...state,
					loadingComment: true
				}

			case "ADD_COMMENT":
				// debugger
				return {
					...state,
					comments: [...state.comments, action.comment],
					addedNewComment: true
				}

			case "FALSIFY_ADDED_NEW_COMMENT":
				// debugger
				return {
					...state,
					addedNewComment: false
				}

			default:
				return state;	
		}
}
