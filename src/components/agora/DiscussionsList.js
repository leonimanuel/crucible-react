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
			this.props.interests.find(i => i.selected) ? this.props.addNewDiscussion(this.props.groupId, "") : alert("Please select at least one interest to get article recommendations")
			
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
			discussions = this.props.allDiscussions.filter(d => d.access === "guest")
			// debugger
		} else {
			discussions = this.props.discussions
		}

		let sortedDiscussions = discussions.sort((a, b) => (a.updated_at > b.updated_at) ? 1 : -1)
		// debugger
		if (sortedDiscussions.length || this.props.selectedGroupName !== "Feed") {
			return sortedDiscussions.map(discussion => {
				// debugger
				return <DiscussionItem key={discussion.id} discussion={discussion} groupName={this.props.group.name} class="sidenav-item"/>
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
					{this.props.selectedGroupName === "Guest" ? null : <AddListItemButton id="new-discussion-button" buttonAction={this.handleNewDiscussion}/>}
				</div>
					{this.props.selectedGroupName === "Feed" && !this.props.interests.find(i => i.selected) ? <div style={{"background-color": "#faf0af", color: "black", "border-radius": "5px", "margin-bottom": "5px", padding: "5px"}}>⚠️ Please select at least one interest to receive recommended discussions</div> : null }
				<div className="sidenav-list-contents">
					{this.props.discussionLoading 
						?
							<div className="loading-animation">
								<div id="discussion-loading-text">Getting article. Can take up to a minute...</div>
								<div className="spinner">
								  <div className="rect1"></div><div className="rect2"></div><div className="rect3"></div><div className="rect4"></div><div className="rect5"></div>
								</div> 
							</div>
						:
							null
					}
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
		selectedGroupName: state.groups.allGroups.find(g => g.id === state.groups.selectedGroupId).name,
		discussions: state.discussions.allDiscussions.filter(discussion => discussion.group_id === state.groups.selectedGroupId),
		allDiscussions: state.discussions.allDiscussions,
		discussionLoading: state.discussions.loadingNewDiscussion,
		interests: state.discussions.allInterests
	}
}

export default connect(mapStateToProps, { updateGroupDiscussions, addNewDiscussion })(DiscussionsList);




