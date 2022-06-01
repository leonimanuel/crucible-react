import React, { Component } from "react"
import { connect } from "react-redux"

import { loadSelectedGroup, leaveGroup, joinGroup, readGroupNotifications } from "../../actions/groups.js"

import Menu from "../tools/Menu.js";
import LoadingBar from "../tools/LoadingBar.js"
import PrivateIcon from "./locked_icon.svg"
import PublicIcon from "./globe_online_world_icon.svg"
import GroupMembersModal from "./GroupMembersModal.js"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class GroupCard extends Component {
	state = {
		groupMembershipNotificationRead: false
	}

	componentDidMount() {
		this.props.loadSelectedGroup(this.props.groupId)
		// this.props.getMembershipStatus(this.props.currentUserId)
	}

	componentDidUpdate(lastProps) {
		if (lastProps.notificationGroups.length == 0 && this.props.notificationGroups.length != 0 && !this.state.groupMembershipNotificationRead) {
			this.props.readGroupNotifications(this.props.userId, this.props.notificationGroups, this.props.groupId);
			this.setState({groupMembershipNotificationRead: true})
		}
		if (lastProps.groupId != this.props.groupId) {
			// debugger
			this.props.loadSelectedGroup(this.props.groupId)
		}

		if (this.props.selectedGroup.private && !this.props.isMemberOfSelectedGroup) {
    	document.location.href="/";
		}
	}

	render() {
		// let group = this.props.groups.find(group => group.id == this.props.groupId);
		let group = this.props.selectedGroup;
		return (
			<div id="group-card-container" className="timeline-card-container">	 
				{
					group ?
						<React.Fragment>
							<div id="group-card-name-wrapper">
								<div id="name-and-membership-wrapper">
									<div className="timeline-card-name"><img id="group-privacy-icon" src={group.private ? PrivateIcon : PublicIcon} alt="private-icon" width="20px" /> {group.name}</div>
						      {
						      	this.props.isMemberOfSelectedGroup
						      		?
						      			<div id="group-membership-indicator">member</div>
						      		:
						      		group.private ? null : <button onClick={() => this.props.joinGroup(this.props.groupId)}>join group</button>
						      }
						      
								</div>
					      
					      <Menu>
					        <nav className="dropdown-nav">
					          <ul className="nav">
					            {this.props.isMemberOfSelectedGroup ? <li><div onClick={() => this.props.leaveGroup(this.props.groupId)}>leave group</div></li> : null}
					          </ul>
					        </nav>
					      </Menu>
							</div>

							<div id="group-card-members-wrapper">
							  <Popup trigger={<span id="group-card-members-button">{this.props.groupMembers.length ? this.props.groupMembers.length : group.member_count} members</span>} position="center" modal>
						    	{ close => <GroupMembersModal 
						    			group={group}
						    			handleGroupMemberAdded={() => close()} 
						    			closePopup={() => close()} 
						    		/> 
						    	}
							  </Popup>										
							</div>

						</React.Fragment>
					: <LoadingBar />
				}
		
			</div>
		)
	}
}

const mapStateToProps = state => {
  return {
    groups: state.groups.allGroups,
    selectedGroup: state.groups.selectedGroup,
    groupMembers: state.groups.selectedGroupMembers,
    isMemberOfSelectedGroup: state.groups.isMemberOfSelectedGroup,
    currentUserId: state.users.userId,
    notificationGroups: state.notifications.notification_groups,
    userId: state.users.userId
    // members: state.groups.allMembers
  }
}

export default connect(mapStateToProps, { loadSelectedGroup, leaveGroup, joinGroup, readGroupNotifications })(GroupCard);














