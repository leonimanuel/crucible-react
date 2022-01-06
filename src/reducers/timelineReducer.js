export default function timelineReducer(state = {
	activities: [],
	replies: []
}, action) {
	switch(action.type) {
		case "SET_ACTIVITIES":
			return {
				...state,
				activities: action.activities
			}
		
		case "SET_REPLIES":
			return {
				...state,
				replies: action.replies
			}		

		case "ADD_NEW_REPLY":
			return {
				...state,
				replies: [...state.replies, action.reply]
			}					
		// case "UPDATE_ACTIVITY_REVIEWABLE":
		// 	const reviewedItem = state.activities.find(a => a.item.object.id == action.selectedItem.id && a.item.type == action.selectedItem.type)
		// 	const reviewedItemIndex = state.activities.indexOf(reviewedItem)

		// 	const newStateActivities = state.activities
		// 	newStateActivities[reviewedItemIndex].item["reviewable"] = false
		// 	debugger
		// 	return {
		// 		...state,
		// 		activities: newStateActivities
		// 	}

		default: 
			return state
	}
}