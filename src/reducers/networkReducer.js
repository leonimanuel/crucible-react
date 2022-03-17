export default function networkReducer(state = {
	followingContacts: [],
	followersContacts: [],
	selectedContact: "",
	memberResults: [],
	memberFollowingStatus: [],
	contactFeed: []
}, action) {
	switch(action.type) {
		case "SET_NETWORK_FOLLOWING":
			return {
				...state,
				followingContacts: [...action.contacts]
			}

		case "SET_NETWORK_FOLLOWERS":
			return {
				...state,
				followersContacts: [...action.contacts]
			}			

		case "SET_SELECTED_CONTACT":
			const sortedUserActivities = action.activities.sort((a, b) => new Date(b.time) - new Date(a.time))
			return {
				...state,
				selectedContact: action.contact,
				contactFeed: [...sortedUserActivities]
			}

		case "CLEAR_SELECTED_CONTACT":
			return {
				...state,
				selectedContact: "",
				contactFeed: []
			}

		case "CHANGE_MEMBER_FOLLOW_STATUS":
			let selectedContact = state.selectedContact
			selectedContact["is_following"] = action.followStatus


			// Add/remove member from "following" list based on user action
			let followingContacts = state.followingContacts
			if (action.followStatus == true) {
				followingContacts = followingContacts.find(m => m.id == selectedContact.id) ? followingContacts : [...followingContacts, selectedContact]
			} else if (action.followStatus == false) {
				followingContacts = followingContacts.filter(m => m.id != selectedContact.id)
			}

			return {
				...state,
				selectedContact: selectedContact,
				followingContacts: followingContacts
			}

		case "SET_MEMBER_RESULTS":
			let members = action.members.map(member => {
				member["type"] = "recommendation"
				return member
			})

			let memberFollowingStatus = members.map(member => {
				return {memberId: member.id, isFollowing: member.is_following}
			})

			return {
				...state,
				memberResults: members,
				memberFollowingStatus: memberFollowingStatus
			}

		default: 
			return state
	}
}