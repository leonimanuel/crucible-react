import React, { Component } from 'react';
// import { connect } from "react-redux"
// import Group from "./Group.js"

class GroupsList extends Component {
	render() {
		return (
			<div >
				<div>Groups</div>
				<div>
					{this.props.groups.map(group =><div>GROUPBOI</div>)}
				</div>
			</div>
		)
	}
}


export default GroupsList;




