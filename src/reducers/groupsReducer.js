export default function groupsReducer(state = {
	groups: [],
	selectedGroup: "",
	members: [], //[{name: "alice", email: "alice@aol.com"}, {name: "bill", email: "bill@aol.com"}],
	discussions: [],
	discussion: "",
	loading: false,
	showDetailPane: false 
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

			case "SHOW_DETAIL_PANE":
				return {
					...state,
					showDetailPane: true
				}

			case "HIDE_DETAIL_PANE":
				return {
					...state,
					showDetailPane: false
				}

			case "ADD_USERS":
				// debugger
				return {
					...state,
					members: action.users
				}
			
			default:
				return state;	
		}
}
