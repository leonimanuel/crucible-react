import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import { connect } from 'getstream';


const Notification = (props) => {
	const { notification_group } = props
	
	const latest_actor = notification_group.activities[0].actor
	const additional_actor_count = notification_group.actor_count - 1
	const notificationObject = notification_group.group_object

		let target_path = ""


	const generateNotificationText = () => {
		let notifTypeClassName = ""
		let notifDescription = ""

		switch (notification_group.action_type) {
			case "add_position":
				notifTypeClassName = "add_position"
				notifDescription = " created a new position"
				target_path = `/posts/${notificationObject.type}/${notificationObject.id}`
				break

			case "add_comment":
				notifTypeClassName = "add_comment"
				notifDescription = " tagged you on a post:"
				target_path = `/posts/${notificationObject.type}/${notificationObject.id}`				
				break

			case "create_reply":
				notifTypeClassName = "create_reply"
				notifDescription =  ` ${additional_actor_count ? `and ${additional_actor_count} others` : ""} replied to ${props.currentUser.id == notificationObject.author.id ? "your" : `<b>${notificationObject.author.handle}</b>'s`} comment: `
				break

			case "tag_user_on_reply":
				notifTypeClassName = "tag_user_on_reply"
				notifDescription =  " tagged you on a reply: "
				target_path = `/posts/${notificationObject.type}/${notificationObject.id}`
				break

			case "add_article_share":
				notifTypeClassName = "add_article_share"
				notifDescription =  " shared an article: "
				target_path = `/posts/${notificationObject.type}/${notificationObject.id}`
				break

			case "create_group": 
				notifTypeClassName = "added_to_group"
				notifDescription =  " added you to a new group"
				target_path = `/groups/${notificationObject.id}`
				break			

			case "create_group_join":
				notifTypeClassName = "add_user_to_group"
				notifDescription = " added you to a group"
				target_path = `/groups/${notificationObject.id}`
				break


			default: 
				notifTypeClassName = ""
				notifDescription =  ""
				break				
		}

		return <span className={`notification-description ${notifTypeClassName}`}><Link className="contact-result-link" to={`/profiles/${latest_actor.id}`} >{latest_actor.handle}</Link>{notifDescription}</span>
	}

	return (
		<div className={`notification-container ${notification_group.is_read ? "read" : "unread"}`} onClick={() => props.handleSelectNotification(notificationObject.id, notificationObject.type, notification_group)}>
			<Link to={target_path} >
				{generateNotificationText()}

				<span className="notification-target" >
					{notificationObject.content}
				</span> 			
			</Link>			 
		</div>
	)
}

const mapStateToProps = state => {
	return {
		currentUser: state.users.user
	}
}

export default connect(mapStateToProps)(Notification);