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
		let notifTypeClassName = ""
		let notifDescription = ""

		switch (notification_group.action_type) {
			case "add_position":
				notifTypeClassName = "add_position"
				notifDescription = "created a new position"
				break

			case "add_comment":
				notifTypeClassName = "add_comment"
				notifDescription = " tagged you on a post:"				
				break

			case "create_reply":
				notifTypeClassName = "create_reply"
				notifDescription =  `${additional_actor_count ? `and ${additional_actor_count} others` : ""} replied to your comment: `
				break

			case "tag_user_on_reply":
				notifTypeClassName = "tag_user_on_reply"
				notifDescription =  "  tagged you on a reply: "
				break

			case "add_article_share":
				debugger
				notifTypeClassName = "add_article_share"
				notifDescription =  " shared an article: "
				break

			default: debugger
		}

		return <span className={`notification-description ${notifTypeClassName}`}><Link className="contact-result-link" to={`/profiles/${latest_actor.id}`} >{latest_actor.handle}</Link>{notifDescription}</span>
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