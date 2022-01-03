export default function timelineReducer(state = {
	activities: []
}, action) {
	switch(action.type) {
		case "SET_ACTIVITIES":
			return {
				...state,
				activities: action.activities
			}
		
		default: 
			return state
	}
}