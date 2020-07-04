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
	renderForum: false
}, action) {
		// debugger
		// console.log("executing groupsReducer")
		switch (action.type) {
			case "LOAD_GROUPS":
				// debugger
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
					selectedGroupId: action.groupId
				}

			// case "UPDATE_GROUP_DISCUSSIONS":
			// 	console.log("updating group discussions")
			// 	// debugger
			// 	return {
			// 		...state,
			// 		selectedGroup: {
			// 			...state.selectedGroup,
			// 			discussions: [...state.selectedGroup.discussions, action.discussion]
			// 		}
			// 	}

			case "ADD_GROUP":
				// debugger
				return {
					...state,
					allGroups: [...state.groups, action.group]
				}

			case "ADD_MEMBERS":
				// debugger
				return {
					...state,
					allMembers: action.members
				}
			
			// case "ADD_UNREAD_MESSAGES_COUNT":
			// 	return {
			// 		...state,
			// 		groupUnreadMessages: action.groupUnreadCount
			// 	}

			// case "RESET_DISCUSSION_UNREAD_COUNT":
			// 	let groupsClone = _.cloneDeep(state.groups)
			// 	let targetGroup = groupsClone.find(group => group.id === group.discussions.find(discussion => discussion.id === action.response.discussion_id).group_id)
			// 	debugger
			// 	let targetDiscussion = targetGroup.discussions.find(discussion => discussion.id === parseInt(action.response.discussion_id))

			// 	if (action.response.unread_messages === 0 ) {
			// 		targetDiscussion.unread_messages_count = 0
			// 	} else if (action.response.unread_messages === 1 && !state.renderForum ) {
			// 			targetDiscussion.unread_messages_count += 1
			// 	}

				
			// 	targetGroup.discussions.filter(discussion => discussion.id !== targetDiscussion.id)
			// 	let updatedGroup = targetGroup.discussions.push(targetDiscussion)
				
			// 	groupsClone.filter(group => group.id !== updatedGroup.id)
			// 	let updatedGroups = groupsClone.push(updatedGroup)
			// 	debugger
			// 	return {
			// 		...state,
			// 		groups: updatedGroups
			// 	}


			// case "TOGGLE_FORUM":
			// 	return {
			// 		...state,
			// 		renderForum: !state.renderForum
			// 	}


			default:
				return state;	
		}
}
