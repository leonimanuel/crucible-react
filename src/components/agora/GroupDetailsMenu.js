import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionsList from "./DiscussionsList.js"
import MembersList from "./MembersList.js"
// import ConsoleTopic from "./ConsoleTopic.js"


class GroupDetailsMenu extends Component {
	render() {
		debugger
		console.log(this.props.group)
		return (
			<div id="group-details-menu">
				<div className="">{this.props.group.name}</div>
				<MembersList members={this.props.group.users}/>
				<DiscussionsList group={this.props.group} />
			</div>
		)
	}
}


export default connect(state => ({group: state.sidenav.selectedGroup}))(GroupDetailsMenu);




