export default function groupsReducer(state = {
	groups: [],
	selectedGroup: "",
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

			case "SET_SELECTED_GROUP":
				console.log("setting state.details to true")
				return {
					...state,
					selectedGroup: action.group
				}

			default:
				return state;	
		}
}
