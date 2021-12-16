export default function commentsReducer(state = {
	selectedComment: {}
}, action) {
	switch(action.type) {
		case "SELECT_COMMENT":
			return {
				...state,
				selectedComment: action.comment
			}

		
		default: 
			return state
	}
}