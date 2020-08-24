import React, { Component } from 'react';
import { connect } from "react-redux"
import { Redirect, Link } from "react-router-dom";
import { createPopper } from "@popperjs/core"

import DiscussionsList from "./DiscussionsList.js"
import MembersList from "./MembersList.js"
// import GuestsList from "./GuestsList.js"
import EditGroupPopup from "./EditGroupPopup.js"
import { fetchInterests } from "../../actions/discussionsActions.js"

// import ConsoleTopic from "./ConsoleTopic.js"

class GroupDetailsMenu extends Component {
	state = {
		renderEditGroupPopup: false,
		// renderInterests: false
	}

	// openInterests = () => {
	// 	alert("opening interests")
	// 	this.setState({renderInterests: true})
	// }

	componentDidMount() {
		return this.props.group.name === "Feed" ? this.props.fetchInterests() : null
	}
	redirectToInterests = () => {
		return <Redirect to={"/groups/interests"} />		
	}

	handleEditGroup = () => {		
		this.setState({
			renderEditGroupPopup: true
		}, () => {
			let button = document.querySelector("#edit-group-button");
			let popup = document.querySelector("#edit-group-popup")
			createPopper(button, popup, {
			  placement: 'right',
			  modifiers: [
			    {
			      name: 'offset',
			      options: {
			        offset: [0, 8],
			      },
			    },
			  ],
			});			
		})
	}

	closePopup = () => {
		this.setState({...this.state, renderEditGroupPopup: false})
	}

	render() {
		const { group, members } = this.props
		return (
			<div id="group-details-menu">
				<div id="group-details-title-wrapper">
					<div id="group-details-title">{group.name}</div>
					{group.name !== "Feed" && group.name !== "Guest" 
						? <button id="edit-group-button" onClick={this.handleEditGroup}>edit</button> 
						: group.name === "Feed" 
							? 
								<React.Fragment>
									<Link to="/groups/interests"><button id="interests-menu-button">Interests</button></Link>
									{/*this.state.renderInterests ? this.redirectToInterests : null*/}
								</React.Fragment>
							: null
					}					
				</div>
				{group.name !== "Feed" && group.name !== "Guest"
					? <MembersList members={members} admin={group.admin}/> 
					: null
				}
				<DiscussionsList group={group} />

				{this.state.renderEditGroupPopup ? <EditGroupPopup closePopup={this.closePopup} group={group} members={members} /> : null}				
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		// selectedGroupId: state.groups.selectedGroupId,
		group: state.groups.allGroups.find(group => group.id === state.groups.selectedGroupId),
		members: state.groups.allMembers.filter(m => m.group_id === state.groups.selectedGroupId && m.id !== state.users.userId)
	}
}


export default connect(mapStateToProps, { fetchInterests })(GroupDetailsMenu);




