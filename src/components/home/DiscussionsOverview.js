import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionItem from "../agora/DiscussionItem.js"

class DiscussionsOverview extends Component {
	showUnreadDiscussions = (discussions) => {
		// debugger
		return discussions.map(discussion => {
			return (
				<DiscussionItem 
					key={discussion.id} 
					discussion={discussion} 
					groupName={discussion.group_name} 
				/>
			)
		})
	}

	render() {
		return (
			<div id="discussions-overview">
				{this.showUnreadDiscussions(this.props.discussions)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		discussions: state.discussions.allDiscussions.filter(d => !d.read)
	}
}

export default connect(mapStateToProps)(DiscussionsOverview);