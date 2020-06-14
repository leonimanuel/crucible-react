export default function groupsReducer(state = {
	groups: [],
	details: false,
	members: [],
	discussions: []
}, action) {
		// debugger
		console.log("executing groupsReducer")
		switch (action.type) {
			case "LOAD_GROUPS":
				return {
					...state,
					groups: action.groups
				}

			case "SET_DETAILS_TO_TRUE":
				console.log("setting state.details to true")
				return {
					...state,
					details: true
				}

			default:
				return state;	
		}
}
