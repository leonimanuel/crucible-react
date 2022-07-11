export default function timelineReducer(state = {
	activities: [],
	newPositions: [],
	hasMore: true,
	replies: [],
	timelineType: ""
}, action) {
	switch(action.type) {
		case "SET_ACTIVITIES":
			const sortedTimelineActivities = action.activities.sort((a, b) => new Date(b.time) - new Date(a.time))
			
			return {
				...state,
				activities: [...state.activities, ...sortedTimelineActivities],
				timelineType: "feed",
				hasMore: action.activities.length ? true : false
			}

		case "SET_TIMELINE_TYPE":
			return {
				...state,
				timelineType: action.timelineType			
			}

		case "SET_REPLIES":
			const newReplies = action.replies.filter(r => !state.replies.find(sr => sr.id == r.id))
			return {
				...state,
				replies: [...state.replies, ...newReplies]
			}		

		case "ADD_NEW_REPLY":
			debugger
			return {
				...state,
				replies: [...state.replies, action.reply]
			}					

		case "ADD_NEW_POSITION":
			return {
				...state,
				newPositions: [action.position, ...state.newPositions]
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