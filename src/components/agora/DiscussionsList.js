import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionItem from "./DiscussionItem.js"
import { updateGroupDiscussions } from "../../actions/groups.js"
import NewDiscussionPopup from "./NewDiscussionPopup.js"
import { createPopper } from "@popperjs/core"
import AddListItemButton from "./AddListItemButton.js"
// import ConsoleTopic from "./ConsoleTopic.js"


class DiscussionsList extends Component {
	state = {
		renderNewDiscussionPopup: false
	}

	handleNewDiscussion = () => {
		this.setState({
			renderNewDiscussionPopup: true
		}, () => {
			let button = document.querySelector("#new-discussion-button");
			let popup = document.querySelector("#new-discussion-popup")
			createPopper(button, popup, {
			  placement: 'right',
			});			
		})
	}

	sortedDiscussions = () => {
		let sortedDiscussions = this.props.discussions.sort((a, b) => (a.created_at > b.created_at) ? 1 : -1)
		// debugger
		return sortedDiscussions.map(discussion => {
			return <DiscussionItem key={discussion.id} discussion={discussion} groupName={this.props.group.name}/>
		})
	}

	closePopup = () => {
		this.setState({...this.state, renderNewDiscussionPopup: false})
	}

	render() {
		// debugger
		return (
			<div id="group-discussions-list" className="sidenav-list">
				<div className="list-title-wrapper">
					<div className="list-title">Discussions</div>
					<AddListItemButton buttonAction={this.handleNewDiscussion}/>
					{/*<div 
											onClick={this.handleNewDiscussion} 
											id="new-discussion-button"
											className="new-list-item-button"
										>
											+
										</div>*/}
				</div>
				<div>
					{this.sortedDiscussions()}
				</div>
				{this.state.renderNewDiscussionPopup ? <NewDiscussionPopup groupId={this.props.group.id} closePopup={this.closePopup}/> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		discussions: state.discussions.allDiscussions.filter(discussion => discussion.group_id === state.groups.selectedGroupId)
	}
}

export default connect(mapStateToProps, { updateGroupDiscussions })(DiscussionsList);




