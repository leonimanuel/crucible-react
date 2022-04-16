export default function notificationsReducer(state = {
	notification_groups: [],
	notification_group_activities: [],
	unreadNotificationsCount: "",
	unseen_notifications_count: "",
	selectedNotificationActivity: ""
}, action) {
	switch(action.type) {
		case "SET_NOTIFICATIONS":
			// debugger
			const notificationGroupsArray = action.notifications.results
			const sortedNotificationGroupsArray = notificationGroupsArray.sort(function(a,b) {
			  // Turn your strings into dates, and then subtract them
			  // to get a value that is either negative, positive, or zero.
			  return new Date(b.created_at) - new Date(a.created_at);
			});

			return {
				...state,
				notification_groups: sortedNotificationGroupsArray,
				unreadNotificationsCount: action.notifications.unread,
				unseen_notifications_count: action.notifications.unseen,
			}
		
		case "READ_NOTIFICATION":			
			const notificationGroups = state.notification_groups
			const selectedNotificationGroup = notificationGroups.find(n => n.id === action.notifId)

			const modifiedNotificationGroup = selectedNotificationGroup
			debugger
			modifiedNotificationGroup.is_read = true

			const newNotificationGroups = notificationGroups.filter(n => n.id !== modifiedNotificationGroup.id)

			const sortedNotificationGroups = [...newNotificationGroups, modifiedNotificationGroup].sort(function(a,b) {
			  // Turn your strings into dates, and then subtract them
			  // to get a value that is either negative, positive, or zero.
			  return new Date(b.created_at) - new Date(a.created_at);
			});

			// const selectionIndex = notificationGroups.indexOf(selectedNotificationGroup)
			// notificationGroups[selectionIndex].is_read = true

			// const updatedNotificationGroups = state.notification_groups.filter(n => n.id !== action.notifId)
			return {
				...state,
				notification_groups: sortedNotificationGroups,
				unreadNotificationsCount: state.unreadNotificationsCount === 0 ? state.unreadNotificationsCount : state.unreadNotificationsCount - 1
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