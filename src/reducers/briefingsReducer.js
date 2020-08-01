export default function briefingsReducer(state = {
	allBriefings: []
}, action) {
	switch(action.type) {
		case "ADD_BRIEFINGS":
			return {
				...state,
				allBriefings: action.briefings
			}

		
		default: 
			return state
	}
}