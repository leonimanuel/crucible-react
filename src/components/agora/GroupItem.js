import React, { Component } from 'react';
import { connect } from "react-redux"
// import { showGroupDetails } from "../../actions/users.js"
import { setSelectedGroup } from "../../actions/groups.js"
// import { setSelectedGroup, calculateUnreadMessages } from "../../actions/groups.js"
// import { showDetailPane } from "../../actions/sidenavActions.js"

class GroupsItem extends Component {
	handleGroupClick = () => {
		// this.props.showGroupDetails(this.props.group)
		// debugger
		this.props.setSelectedGroup(this.props.group.id)
		// this.props.showDetailPane()
	}

	componentDidMount() {
		// this.props.calculateUnreadMessages(this.props.discussions)
	}

	render() {
		// debugger
		return (
			<div onClick={this.handleGroupClick}>
				{this.props.group.name}
				{/*this.props.unreadMessages*/}
			</div>
		)
	}
}


// export default connect(mapStateToProps, { setSelectedGroup, calculateUnreadMessages })(GroupsItem);
export default connect(null, { setSelectedGroup })(GroupsItem);




