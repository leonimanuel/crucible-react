export default function messagesReducer(state = {
	messages: []
}, action) {
	switch(action.type) {
		case "SET_MESSAGES":
			return {
				...state,
				messages: action.messages
			}

		case "ADD_NEW_MESSAGE":
			return {
				...state,
				messages: [...state.messages, action.message]
			}
		
		default: 
			return state
	}
}