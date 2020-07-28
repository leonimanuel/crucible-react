import _ from 'lodash';
import cloneDeep from "lodash/cloneDeep"

export default function groupsReducer(state = {
	allGroups: [],
	selectedGroupId: "",
	allMembers: [], //[{name: "alice", email: "alice@aol.com"}, {name: "bill", email: "bill@aol.com"}],
	// discussions: [],
	discussion: "",
	loading: false,
	// showDetailPane: false,
	groupUnreadMessages: "",
	renderForum: false,
	memberSuggestions: []
}, action) {
		// debugger
		// console.log("executing groupsReducer")
		switch (action.type) {
			case "LOAD_GROUPS":
				return {
					...state,
					allGroups: action.groups,
					allMembers: action.groupMembers
				}

			case "SET_SELECTED_GROUP":
				console.log("setting state.details to true")
				// debugger
				return {
					...state,
					selectedGroupId: action.group.id,
				}

			case "ADD_GROUP":
				debugger
				return {
					...state,
					allGroups: [...state.allGroups, action.group],
					allMembers: [...state.allMembers, ...action.group.members]
				}

			case "UPDATE_GROUP":
				debugger
				return {
					...state,
					allGroups: [...state.allGroups.filter(g => g.id !== action.group.id), action.group],
					allMembers: [...state.allMembers.filter(m => m.group_id !== state.selectedGroupId), ...action.group.members ]
				}

			case "ADD_GROUP_MEMBERS":
				return {
					...state,
					allMembers: action.members
				}

			case "ADD_MEMBER_SUGGESTIONS":
				// debugger
				return {
					...state,
					memberSuggestions: action.members
				}

			case "ADD_MEMBERS_FOR_GUEST":
				debugger
				return {
					...state,
					allMembers: [...state.allMembers, ...action.members]
				}


			default:
				return state;	
		}
}
