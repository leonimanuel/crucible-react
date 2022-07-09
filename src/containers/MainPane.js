import React, { Component } from "react"
import { connect } from "react-redux"

import "./sidenav.scss"
import TopicMenu from "../components/console/TopicMenu.js"
import AgoraMenu from "../components/agora/AgoraMenu.js"
import Groups from "./Groups.js"

import { readGroupNotifications } from "../actions/groups.js"

class MainPane extends Component {
	state = {
		groupMembershipNotificationRead: false
	}	

	componentDidMount() {
		// console.log("mounted MainPane")
	}

	componentDidUpdate(lastProps) {
  	// the point of the following logic is: IF any of the group notifications that are contributing to the groupNotificationCount
  	// are about a comment that this reply is attached to, let's read it using readGroupNotifications(userId, notificationGroups, groupId)
  	// To do that, we'll need to get the matching notificationGroup ID pertaining to this reply's parent_comment's "add_comment" action type. 		
		if (this.props.selectedNotificationActivity) {
			const activity = this.props.selectedNotificationActivity
			if (this.props.notificationGroups.length && !!activity.item.object.group_id && !this.state.groupMembershipNotificationRead) {
				let commentNotificationGroup = this.props.notificationGroups.find(ng => ng.group_object.type == "Comment" && ng.group_object.id == activity.item.object.id)
				this.props.readGroupNotifications(this.props.userId, [commentNotificationGroup], activity.item.object.group_id);
				this.setState({groupMembershipNotificationRead: true});
			}
		}
	}

	render() {
		// let mainPane = document.querySelector("#sidenav-main-pane")
		// if (this.props.section) {
		// 	mainPane.style = "width: 100px"
		// }
		let groupNotifications = this.props.notificationGroups.filter(ng => ng.group_object.group && ng.action_type == "add_comment" && !ng.is_read)
		debugger
		return (
			<div id="sidenav-main-pane">
				<div id="console" className={`section-tab ${this.props.section === "console" ? "selected-section" : "unselected-section"}`} onClick={this.props.tabClick}
				>
					Fact Bank 
				</div>
				{<TopicMenu display={this.props.section === "console" && this.props.topics.length ? true : false} />}
				
				<div 
					id="notifications" 
					className={`section-tab ${this.props.section === "notifications" ? "selected-section" : "unselected-section"}`} 
					onClick={this.props.tabClick}
					>
						Notifications {this.props.unreadNotificationsCount > 0 ? <div className="sidenav-badge topic-badge badge">{this.props.unreadNotificationsCount}</div> : null}
				</div>

				<div 
					id="network" 
					className={`section-tab ${this.props.section === "network" ? "selected-section" : "unselected-section"}`} 
					onClick={this.props.tabClick}
					>
						Network
				</div>				

				<div 
					id="groups" 
					className={`section-tab ${this.props.section === "groups" ? "selected-section" : "unselected-section"}`} 
					onClick={this.props.tabClick}
					>
						Groups {groupNotifications.length ? <div className="sidenav-badge topic-badge badge">{groupNotifications.length}</div> : null}
				</div>		
				{<Groups display={this.props.section === "groups"} />}			

				{/*this.props.section === "agora" ? <AgoraMenu /> : null*/}
				
			</div>

		)
	}
}

const mapStateToProps = state => {
  return {
    topics: state.topics.topics,
    unreadNotificationsCount: state.notifications.unreadNotificationsCount,
    notificationGroups: state.notifications.notification_groups,
    selectedNotificationActivity: state.notifications.selectedNotificationActivity,
    selectedGroup: state.groups.selectedGroup,
    userId: state.users.userId
  }
}

export default connect(mapStateToProps, { readGroupNotifications })(MainPane);




