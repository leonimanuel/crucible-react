import React, { Component } from 'react';
import { connect } from "react-redux"
import DiscussionItem from "./DiscussionItem.js"
import rootURL from "../../rootURL.js"
import { updateGroupDiscussions } from "../../actions/groups.js"
import NewDiscussionPopup from "./NewDiscussionPopup.js"
import { createPopper } from "@popperjs/core"
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

	closePopup = () => {
		this.setState({...this.state, renderNewDiscussionPopup: false})
	}

	render() {
		// debugger
		return (
			<div id="group-discussions-list" className="sidenav-list">
				<div className="list-title">Discussions</div>
				<div onClick={this.handleNewDiscussion} id="new-discussion-button">NEW DIS</div>
				<div>
					{this.props.group.discussions.map(discussion => <DiscussionItem key={discussion.id} discussion={discussion}/>)}
				</div>
				{this.state.renderNewDiscussionPopup ? <NewDiscussionPopup groupId={this.props.group.id} closePopup={this.closePopup}/> : null}
			</div>
		)
	}
}


export default connect(null, { updateGroupDiscussions })(DiscussionsList);




