import React, { Component } from "react"
import { connect } from "react-redux"

import { loadSelectedGroup } from "../../actions/groups.js"

import Menu from "../tools/Menu.js";
import LoadingBar from "../tools/LoadingBar.js"
import PrivateIcon from "./locked_icon.svg"
import PublicIcon from "./globe_online_world_icon.svg"
import GroupMembersModal from "./GroupMembersModal.js"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

class GroupCard extends Component {
	componentDidMount() {
		this.props.loadSelectedGroup(this.props.groupId)
		// this.props.getMembershipStatus(this.props.currentUserId)
	}

	render() {
		let group = this.props.groups.find(group => group.id == this.props.groupId);
		return (
			<div id="group-card-container" className="timeline-card-container">	 
				{
					group ?
						<React.Fragment>
							<div id="group-card-name-wrapper">
								<div id="name-and-membership-wrapper">
									<div className="timeline-card-name"><img id="group-privacy-icon" src={group.private ? PrivateIcon : PublicIcon} alt="private-icon" width="20px" /> {group.name}</div>
						      <div id="group-membership-indicator">{group.isMember ? "member" : "join group"}</div>
								</div>
					      <Menu>
					        <nav className="dropdown-nav">
					          <ul className="nav">
					            <li>
					              <a href='#' >All</a>
					            </li>
					            <li>
					              <a href='#' >Not Submitted</a>
					            </li>
					            <li>
					              <a href='#' >Accepted</a>
					            </li>
					            <li>
					              <a href='#' >Rejected</a>
					            </li>
					            <li>
					              <a href='#' >Under Review</a>
					            </li>
					            <li>
					              <a href='#' >Waitlisted</a>
					            </li>
					          </ul>
					        </nav>
					      </Menu>
							</div>

							<div id="group-card-members-wrapper">
							  <Popup trigger={<span id="group-card-members-button">{group.member_count} members</span>} position="center" modal>
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
    currentUserId: state.users.userId
    // members: state.groups.allMembers
  }
}

export default connect(mapStateToProps, { loadSelectedGroup })(GroupCard);














