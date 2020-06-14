import React, { Component } from 'react';
import { connect } from "react-redux"
// import ConsoleTopic from "./ConsoleTopic.js"


class GroupDetailsMenu extends Component {
	render() {
		// debugger
		return (
			<div id="group-details-menu">
				<div className="">{this.props.group.name}</div>
				<div id="groups-list">

				</div>
			</div>
		)
	}
}


export default connect(state => ({group: state.sidenav.selectedGroup}))(GroupDetailsMenu);




