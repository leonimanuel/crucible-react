import React, { Component } from 'react';
// import { connect } from "react-redux"
import GroupItem from "./GroupItem.js"

class GroupsList extends Component {
	render() {
		return (
			<div >
				<div>Groups</div>
				<div>
					{this.props.groups.map(group => <GroupItem key={group.id} group={group} />)}
				</div>
			</div>
		)
	}
}


export default GroupsList;




