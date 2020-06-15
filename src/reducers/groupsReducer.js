export default function groupsReducer(state = {
	groups: [],
	selectedGroup: "",
	members: [],
	discussions: [],
	discussion: "",
	loading: false
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

			case "UPDATE_GROUP_DISCUSSIONS":
				console.log("updating group discussions")
				return {
					...state,
					selectedGroup: {
						...state.selectedGroup,
						discussions: [...state.selectedGroup.discussions, action.discussion]
					}
				}

			default:
				return state;	
		}
}
