import React, { Component } from 'react';
import { connect } from "react-redux"

class GuestsList extends Component {
	render() {
		return (
			<div id="guests-list">
				<div></div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		groupId: state.groups.selectedGroupId,
		discussions: state.discussions.allDiscussions.filter(discussion => discussion.group_id === state.groups.selectedGroupId)
	}
}


export default connect(mapStateToProps)(GuestsList);




