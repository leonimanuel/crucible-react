import React from "react"
import { connect } from "react-redux"
// import { connect } from 'getstream';


const Notification = (props) => {
	const { notification_group } = props
	
	const latest_actor = notification_group.activities[0].actor
	const additional_actor_count = notification_group.actor_count - 1
	const notificationObject = notification_group.group_object

	return (
		<div className={`notification-container ${notification_group.is_read ? "read" : "unread"}`} onClick={() => props.handleSelectNotification(notificationObject.id, notificationObject.type, notification_group.id)}>
			{`${latest_actor} ${additional_actor_count ? `and ${additional_actor_count} others` : ""} 
			replied to your comment: `}

			<span className="notification-target" >
				{notificationObject.content}			
			</span> 			 
		</div>
	)
}

export default Notification;