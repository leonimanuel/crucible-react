// import _ from 'lodash';
// import cloneDeep from "lodash/cloneDeep"

export default function groupsReducer(state = {
	allGroups: [],
	selectedGroupId: "",
	selectedGroup: "",
	selectedGroupMembers: [],
	isMemberOfSelectedGroup: false,
	selectedGroupFeed: [],
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
				const allGroupMembers = action.groups.map(group => group.members).flat()
				return {
					...state,
					allGroups: action.groups,
					// allMembers: allGroupMembers
				}



			case "SET_SELECTED_GROUP":
				debugger
				return {
					...state,
					selectedGroupId: action.group_data.group.id,
					selectedGroup: action.group_data.group,
					selectedGroupMembers: [],
					selectedGroupFeed: action.group_data.feed_items,
					isMemberOfSelectedGroup: action.group_data.is_member,
					// allGroups: [...state.allGroups.filter(g => g.id !== action.group_data.group.id), action.group_data.group],
				}

			case "SET_SELECTED_GROUP_MEMBERS":
				let groupedMembers = action.members.map(member => {
					member["group_id"] = action.groupId;
					return member
				})

				return {
					...state,
					selectedGroupMembers: groupedMembers
					// allMembers: [...state.allMembers.filter(m => m.group_id !== state.selectedGroupId), ...groupedMembers ]
				}

			case "ADD_GROUP":
				return {
					...state,
					allGroups: [...state.allGroups, action.group],
					allMembers: [...state.allMembers, action.group.members]
				}

			case "JOIN_SELECTED_GROUP":
				return {
					...state,
					isMemberOfSelectedGroup: true,
					allGroups: [...state.allGroups, state.selectedGroup]
				}

			case "ADD_MEMBER_TO_GROUP":
				return {
					...state,
					selectedGroupMembers: [...state.selectedGroupMembers, action.newMember]
				}

			case "UPDATE_GROUP":
				return {
					...state,
					allGroups: [...state.allGroups.filter(g => g.id !== action.group.id), action.group],
					allMembers: [...state.allMembers.filter(m => m.group_id !== state.selectedGroupId), ...action.group.members ]
				}

			// case "ADD_GROUP_MEMBERS":
			// 	return {
			// 		...state,
			// 		allMembers: action.members
			// 	}

			case "ADD_MEMBER_SUGGESTIONS":
				return {
					...state,
					memberSuggestions: action.members
				}

			case "ADD_DISCUSSION_AND_COMMENTS":
				return {
					...state,
					allMembers: [...state.allMembers.filter(m => !action.discussionData.members.find(am => am.id === m.id)), ...action.discussionData.members]
				}

			case "LEAVE_SELECTED_GROUP":
				return {
					...state,
					isMemberOfSelectedGroup: false,
					allGroups: state.allGroups.filter(group => group.id != action.groupId)
				}

			default:
				return state;	
		}
}
