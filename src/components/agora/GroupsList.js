import React, { Component } from 'react';
// import { connect } from "react-redux"
import GroupItem from "./GroupItem.js"

class GroupsList extends Component {
	render() {
		return (
			<div className="sidenav-list">
				<div id="groups-list-title" className="list-title">Groups</div>
				<div>
					<div>New Group</div>
					{this.props.groups.map(group => <GroupItem key={group.id} group={group} />)}
				</div>
			</div>
		)
	}
}


export default GroupsList;




