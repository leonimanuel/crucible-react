import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionItem from "../agora/DiscussionItem.js"
import AddListItemButton from "../agora/AddListItemButton.js"

class DiscussionsOverview extends Component {
	showUnreadDiscussions = (discussions) => {
		if (discussions.length) {
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
		} else {
			return (
				<div id="new-discussion-instructions">
					<div><b>To start a new discussion:</b></div>
					<ul >
						<li>For a recommended discussion, open Feed in the Groups section of the sidebar and click the add button</li>
						<li>To create a new discussion with friends, find the desired group in Groups and click the add button or <a className="extension-link" href="https://chrome.google.com/webstore/category/extensions" target="_blank">use the extension</a></li>
					</ul>					
				</div>
			)
		}
	}

	render() {
		return (
			<div id="discussions-overview" className="overview-wrapper">
				<div className="overview-header" id="discussions-overview-header" >New Discussions</div>
				<div className="overview-content-container" id="overview-discussions-container">
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