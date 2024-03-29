import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom"

// import { showGroupDetails } from "../../actions/users.js"
// import { setSelectedGroup } from "../../actions/groups.js"
import { readGroupNotifications } from "../../actions/groups.js"
// import { showDetailPane } from "../../actions/sidenavActions.js"
import PrivateIcon from "./locked_icon.svg"
import PublicIcon from "./globe_online_world_icon.svg"

class GroupsItem extends Component {
	// handleGroupClick = () => {
	// 	this.props.setSelectedGroup(this.props.group)
	// }

	componentDidMount() {
		// this.props.calculateUnreadMessages(this.props.discussions)
	}

	handleGroupClick = () => {
		this.props.readGroupNotifications(this.props.userId, this.props.groupNotifications, this.props.group.id)
	}

	render() {
		return (
			<Link className="group-item-link" to={`/groups/${this.props.group.id}`} >
				<div className={`detail-item-container`} onClick={this.handleGroupClick}>			
					<div><img className="group-privacy-icon" src={this.props.group.private ? PrivateIcon : PublicIcon} alt="private-icon" width="20px" /> {this.props.group.name} {this.props.groupNotifications.length ? <span className="badge">{this.props.groupNotifications.length}</span> : null }</div>
				</div>
			</Link>

		)
	}
}


const mapStateToProps = (state, ownProps) => {
	return {
		// discussions: state.discussions.allDiscussions.filter(d => d.group_id === ownProps.group.id || (d.access === "guest" && ownProps.group.name === "Guest"))
		groupNotifications: state.notifications.notification_groups.filter(ng => (ng.group_object.group == ownProps.group.id) && ng.action_type == "add_comment" && !ng.is_read),
		userId: state.users.userId
	}
}

// export default connect(mapStateToProps, { setSelectedGroup, calculateUnreadMessages })(GroupsItem);
export default connect(mapStateToProps, { readGroupNotifications })(GroupsItem);




