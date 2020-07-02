import React, { Component } from 'react';
import { connect } from "react-redux"
// import { showGroupDetails } from "../../actions/users.js"
import { setSelectedGroup, calculateUnreadMessages } from "../../actions/groups.js"
// import { showDetailPane } from "../../actions/sidenavActions.js"

class GroupsItem extends Component {
	handleGroupClick = () => {
		// this.props.showGroupDetails(this.props.group)
		this.props.setSelectedGroup(this.props.group)
		// this.props.showDetailPane()
	}

	componentDidMount() {
		this.props.calculateUnreadMessages(this.props.discussions)
	}

	render() {
		debugger
		return (
			<div onClick={this.handleGroupClick}>
				{this.props.group.name}
				{this.props.unreadMessages}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		discussions: state.discussion.discussions,
		unreadMessages: state.groups.unreadMessages
	}
}


export default connect(mapStateToProps, { setSelectedGroup, calculateUnreadMessages })(GroupsItem);




