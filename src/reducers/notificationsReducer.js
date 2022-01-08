export default function notificationsReducer(state = {
	notification_groups: [],
	notification_group_activities: [],
	unread_notifications_count: 0,
	unseen_notifications_count: 0,
	selectedNotificationActivity: ""
}, action) {
	switch(action.type) {
		case "SET_NOTIFICATIONS":
			// debugger
			const notification_groups = action.notifications.results
			return {
				...state,
				notification_groups: notification_groups,
				unread_notifications_count: action.notifications.unread,
				unread_notifications_count: action.notifications.unseen,
			}
		
		case "READ_NOTIFICATION":			
			const notificationGroups = state.notification_groups
			const selectedNotificationGroup = state.notification_groups.find(n => n.id === action.notifId)

			const selectionIndex = notificationGroups.indexOf(selectedNotificationGroup)
			notificationGroups[selectionIndex].is_read = true

			// const updatedNotificationGroups = state.notification_groups.filter(n => n.id !== action.notifId)
			debugger
			return {
				...state,
				notification_groups: notificationGroups,
				unread_notifications_count: state.unread_notifications_count - 1
			}

		case "SET_NOTIFICATION_ACTIVITY":
			return {
				...state,
				selectedNotificationActivity: action.activity
			}	

		case "CLEAR_NOTIFICATION_ACTIVITY":
			return {
				...state,
				selectedNotificationActivity: ""
			}

		default: 
			return state
	}
}