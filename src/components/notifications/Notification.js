import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import { connect } from 'getstream';


const Notification = (props) => {
	const { notification_group } = props
	
	const latest_actor = notification_group.activities[0].actor
	const additional_actor_count = notification_group.actor_count - 1
	const notificationObject = notification_group.group_object
	const generateNotificationText = () => {
		debugger
		switch (notification_group.action_type) {
			case "add_position":
				return (
					<span><Link className="contact-result-link" to={`/profiles/${latest_actor.id}`} >{latest_actor.handle}</Link> created a new position</span> 							
				)

			case "add_comment":
				return (
					<span><Link className="contact-result-link" to={`/profiles/${latest_actor.id}`} >{latest_actor.handle}</Link>  tagged you on a post:</span> 											
				)

			case "create_reply":
				return (
					<span><Link className="contact-result-link" to={`/profiles/${latest_actor.id}`} >{latest_actor.handle}</Link> {additional_actor_count ? `and ${additional_actor_count} others` : ""} replied to your comment: </span> 	
				)		

			case "tag_user_on_reply":
				return (
					<span><Link className="contact-result-link" to={`/profiles/${latest_actor.id}`} >{latest_actor.handle}</Link>  tagged you on a reply: </span> 												
				)
		}
	}

	if (!notificationObject) {
		debugger
	}

	return (
		<div className={`notification-container ${notification_group.is_read ? "read" : "unread"}`} onClick={() => props.handleSelectNotification(notificationObject.id, notificationObject.type, notification_group)}>
			<Link to={`/posts/${notificationObject.type}/${notificationObject.id}`} >
				{generateNotificationText()}

				<span className="notification-target" >
					{notificationObject.content}			
				</span> 			
			</Link>			 
		</div>
	)
}

export default Notification;