export default function notificationsReducer(state = {
	notifications: [1,2,3]
}, action) {
	switch(action.type) {
		case "SET_NOTIFICATIONS":
			return {
				...state,
				messages: action.messages
			}
		
		default: 
			return state
	}
}