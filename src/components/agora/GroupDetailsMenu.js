import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionsList from "./DiscussionsList.js"
// import ConsoleTopic from "./ConsoleTopic.js"


class GroupDetailsMenu extends Component {
	render() {
		console.log(this.props.group)
		return (
			<div id="group-details-menu">
				<div className="">{this.props.group.name}</div>
				<DiscussionsList discussions={this.props.group.discussions}/>
			</div>
		)
	}
}


export default connect(state => ({group: state.sidenav.selectedGroup}))(GroupDetailsMenu);




