import React, { Component } from 'react';
import { connect } from "react-redux"
import { Redirect } from "react-router-dom";
import DiscussionItem from "./DiscussionItem.js"
import { updateGroupDiscussions } from "../../actions/groups.js"
import { addNewDiscussion } from "../../actions/discussionsActions.js"
import NewDiscussionPopup from "./NewDiscussionPopup.js"
import { createPopper } from "@popperjs/core"
import AddListItemButton from "./AddListItemButton.js"
// import ConsoleTopic from "./ConsoleTopic.js"


class DiscussionsList extends Component {
	state = {
		renderNewDiscussionPopup: false
	}

	componentDidMount() {
		if (this.props.selectedGroupName === "Feed" && !this.props.discussions.length) {
			// this.props.renderInterests()
		} 
	}

	handleNewDiscussion = () => {
		if (this.props.selectedGroupName === "Feed") {
			this.props.addNewDiscussion(this.props.groupId, "")
		} else {
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
	}

	sortedDiscussions = () => {
		let discussions
		if (this.props.selectedGroupName === "Guest") {
			debugger
			discussions = this.props.allDiscussions.filter(d => d.access === "guest")
		} else {
			discussions = this.props.discussions
		}

		let sortedDiscussions = discussions.sort((a, b) => (a.updated_at > b.updated_at) ? 1 : -1)
		if (sortedDiscussions.length) {
			return sortedDiscussions.map(discussion => {
				return <DiscussionItem key={discussion.id} discussion={discussion} groupName={this.props.group.name}/>
			})			
		} else {
			return <Redirect to={"/groups/interests"} />
		}
	}

	closePopup = () => {
		this.setState({...this.state, renderNewDiscussionPopup: false})
	}

	render() {
		// debugger
		return (
			<div id="group-discussions-list" className="sidenav-list">
				<div className="list-title-wrapper" id="discussions-list-title-wrapper">
					<div className="list-title">Discussions</div>
					<AddListItemButton id="new-discussion-button" buttonAction={this.handleNewDiscussion}/>
				</div>
				<div className="sidenav-list-contents">
					{this.sortedDiscussions()}
				</div>
				{this.state.renderNewDiscussionPopup ? <NewDiscussionPopup groupId={this.props.group.id} closePopup={this.closePopup}/> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		groupId: state.groups.selectedGroupId,
		selectedGroupName: state.groups.selectedGroupName,
		discussions: state.discussions.allDiscussions.filter(discussion => discussion.group_id === state.groups.selectedGroupId),
		allDiscussions: state.discussions.allDiscussions
	}
}

export default connect(mapStateToProps, { updateGroupDiscussions, addNewDiscussion })(DiscussionsList);




