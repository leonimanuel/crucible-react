import React, { Component } from 'react';
// import { connect } from "react-redux"
import GroupItem from "./GroupItem.js"
import plusIcon from "../../add_icon.svg"

class GroupsList extends Component {
	render() {
		// debugger
		return (
			<div id="groups-list" className="sidenav-list">
				<div className="list-title-wrapper">
					<div id="groups-list-title" className="list-title">Groups</div>
					<img className="new-group-button" src={plusIcon} alt=""/>					
				</div>
				<div>
					<button id="new-group-button" onClick={this.props.createGroup} >New Group</button>
					{this.props.groups.map(group => <GroupItem key={group.id} group={group} />)}
				</div>
			</div>
		)
	}
}


export default GroupsList;




