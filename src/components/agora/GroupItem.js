import React, { Component } from 'react';
// import { connect } from "react-redux"
// import GroupItem from "./Group.js"

class GroupsList extends Component {
	render() {
		return (
			<div>
				{this.props.group.name}
			</div>
		)
	}
}


export default GroupsList;




