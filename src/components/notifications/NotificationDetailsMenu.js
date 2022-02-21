import React, { useState, useEffect } from "react"
import "./notifications.scss"
import { connect } from "react-redux"
import { setNotifications, readNotification } from "../../actions/notificationsActions.js"

import Notification from "./Notification.js"

const NotificationDetailsMenu = (props) => {
	const [stateMounted, setStateMounted] = useState(false);

	useEffect(() => {
		if (!props.notification_groups.length && !stateMounted) { // if there are no notifications alread stored
			props.setNotifications(props.userId)

			setStateMounted(true) // SUPER IMPORTANT TO AVOID INFINITE API CALLS
		}
	})

	return (
		<div id="notification-details-menu-container">
			<div id="notification-menu-header-wrapper">
				<div id="notification-menu-header">Notifications</div>
			</div>
			
			{props.notification_groups.length ? 
				props.notification_groups.map((n, index) => {
					return (
						<Notification 
							notification_group={n} 
							key={index} 
							index={index} 
							handleSelectNotification={(objectId, objectType, notifId, userId) => props.readNotification(objectId, objectType, notifId, props.userId)} 
						/>
					)
				}) 
				:
				<div id="notifications-prompt" className="sidenav-onboarding-prompt">Notifications involving your posts, comments or other activities will appear here</div>
			}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		notification_groups: state.notifications.notification_groups,
		userId: state.users.userId
	}
}

export default connect(mapStateToProps, { setNotifications, readNotification })(NotificationDetailsMenu);