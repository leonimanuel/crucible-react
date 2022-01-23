export default function networkReducer(state = {
	followingContacts: [],
	followersContacts: [],
	selectedContact: "",
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

		default: 
			return state
	}
}