import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionsList from "./DiscussionsList.js"
import MembersList from "./MembersList.js"
// import ConsoleTopic from "./ConsoleTopic.js"


class GroupDetailsMenu extends Component {
	render() {
		// console.log(this.props.group)
		debugger
		return (
			<div id="group-details-menu">
				<div className="group-details-title">{this.props.group.name}</div>
				<MembersList members={this.props.members}/>
				<DiscussionsList group={this.props.group} />
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




