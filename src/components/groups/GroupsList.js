import React, { Component } from 'react';
// import { connect } from "react-redux"
import GroupItem from "./GroupItem.js"
// import plusIcon from "../../add_icon.svg"
import AddListItemButton from "./AddListItemButton.js"

class GroupsList extends Component {
	render() {
		// debugger
		return (
			<div id="groups-list" className="sidenav-list">
				<div id="new-group-button" className="list-title-wrapper">
					<div id="groups-list-title" className="list-title">Groups</div>
					<AddListItemButton buttonAction={this.props.createGroup} fill="black" />
				</div>
				<div className="group-list-items-wrapper">
					{this.props.groups.map(group => <GroupItem key={group.id} group={group} />)}
				</div>
			</div>
		)
	}
}


export default GroupsList;




