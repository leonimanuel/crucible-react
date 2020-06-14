import React, { Component } from 'react';
import { connect } from "react-redux"
// import { showGroupDetails } from "../../actions/users.js"
import { setSelectedGroup } from "../../actions/groups.js"

class GroupsItem extends Component {
	handleGroupClick = () => {
		// this.props.showGroupDetails(this.props.group)
		this.props.setSelectedGroup(this.props.group)
	}

	render() {
		return (
			<div onClick={this.handleGroupClick}>
				{this.props.group.name}
			</div>
		)
	}
}


export default connect(null, { setSelectedGroup })(GroupsItem);




