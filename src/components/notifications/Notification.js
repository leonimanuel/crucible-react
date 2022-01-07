import React from "react"
import "./notifications.scss"
import { connect } from "react-redux"

import Notification from "./Notification.js"

const NotificationDetailsMenu = (props) => {
	return (
		<div className="notification-container">
			Notification {props.index}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		notifications: state.notifications.notifications
	}
}

export default connect(mapStateToProps)(NotificationDetailsMenu);