import React from "react"
import "./notifications.scss"
import { connect } from "react-redux"

import Notification from "./Notification.js"

const NotificationDetailsMenu = (props) => {
	return (
		<div id="notification-details-menu-container">
			<div id="notification-menu-header-wrapper">
				<div id="notification-menu-header">Notifications</div>
			</div>
			
			{props.notifications.map((n, index) => <Notification notification={n} index={index} />)}
		</div>


	)
}

const mapStateToProps = state => {
	return {
		notifications: state.notifications.notifications
	}
}

export default connect(mapStateToProps)(NotificationDetailsMenu);