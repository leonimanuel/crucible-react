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
					class="overview-discussion"
				/>
			)
		})
	}

	render() {
		return (
			<div id="discussions-overview">
				<div className="overview-header" id="discussions-overview-header" >New Discussions</div>
				<div id="overview-discussions-container">
					{this.showUnreadDiscussions(this.props.discussions)}				
				</div>
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