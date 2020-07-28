import React, { Component } from 'react';
import { connect } from "react-redux"
// import { showGroupDetails } from "../../actions/users.js"
import { setSelectedGroup } from "../../actions/groups.js"
// import { setSelectedGroup, calculateUnreadMessages } from "../../actions/groups.js"
// import { showDetailPane } from "../../actions/sidenavActions.js"

class GroupsItem extends Component {
	handleGroupClick = () => {
		this.props.setSelectedGroup(this.props.group)
	}

	componentDidMount() {
		// this.props.calculateUnreadMessages(this.props.discussions)
	}

	calculateGroupUnreads = () => {
		let reducer = (accumulator, currentValue) => accumulator + currentValue
		let unreadsArray = this.props.discussions.map(d => d.unread_messages_count)
		const groupUnreads = unreadsArray.reduce(reducer, 0)
		return groupUnreads ? <div className="sidenav-badge badge">{groupUnreads}</div> : null
	}

	render() {
		// debugger
		return (
			<div className="group-item sidenav-item" onClick={this.handleGroupClick}>
				<div>{this.props.group.name}</div>
				{/*this.props.unreadMessages*/}
				<div>{this.calculateGroupUnreads()}</div>
			</div>
		)
	}
}


const mapStateToProps = (state, ownProps) => {
	return {
		discussions: state.discussions.allDiscussions.filter(d => d.group_id === ownProps.group.id || (d.access === "guest" && ownProps.group.name === "Guest"))
	}
}

// export default connect(mapStateToProps, { setSelectedGroup, calculateUnreadMessages })(GroupsItem);
export default connect(mapStateToProps, { setSelectedGroup })(GroupsItem);




