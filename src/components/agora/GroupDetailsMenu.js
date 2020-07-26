import React, { Component } from 'react';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";
import DiscussionsList from "./DiscussionsList.js"
import MembersList from "./MembersList.js"
import GuestsList from "./GuestsList.js"
// import ConsoleTopic from "./ConsoleTopic.js"

class GroupDetailsMenu extends Component {
	openInterests = () => {
		return <Redirect to={"/groups/interests"} />
	}

	render() {
		const { group } = this.props
		return (
			<div id="group-details-menu">
				<div className="group-details-title">{group.name}</div>
				{group.name !== "Feed" 
					? <MembersList members={this.props.members}/> 
					: 
					<div>
						<button id="interests-menu-button" onClick={this.openInterests}>Interests</button>
						{/*<GuestsList />*/}
					</div> 
				}
				<DiscussionsList group={group} />
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


export default connect(mapStateToProps)(GroupDetailsMenu);




