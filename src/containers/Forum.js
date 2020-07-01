import React, { Component } from 'react';
import { connect } from "react-redux"
// import { resetUnreadCount } from "../actions/discussionsActions.js"
import { API_ROOT, HEADERS } from "../constants"
import { fetchMessages } from "../actions/discussionsActions.js"

import "./forum.css"
import ForumMessageForm from "../components/agora/forum/ForumMessageForm.js"
import ForumMessages from "../components/agora/forum/ForumMessages.js"

class Forum extends Component {
	componentDidMount() {
		debugger
		if (!this.props.discussion.messages) {
			debugger
			this.props.fetchMessages(this.props.discussion.group_id, this.props.discussion.id)
		}

		// this.props.resetUnreadCount(this.props.discussion)
	 //  fetch(`${API_ROOT}/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.id}/unread-messages-count`, {
	 //    method: 'PATCH',
	 //    headers: HEADERS,
	 //  });
	}

	componentDidUpdate() {
		// this.props.resetUnreadCount(this.props.discussion)
	  // fetch(`${API_ROOT}/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.id}/unread-messages-count`, {
	  //   method: 'PATCH',
	  //   headers: HEADERS,
   //    // body: JSON.stringify({
   //    //   userId: this.props.userId
   //    // })
	  // });
	}

	render() {
		console.log("rendering Forum")
		// debugger
		return (
			<div id="forum-container">
				<div id="forum-header-container">
					{this.props.discussion.group.name}
				</div>

				<ForumMessages discussion={this.props.discussion} currentUserId={this.props.currentUserId}/>

				<ForumMessageForm discussion={this.props.discussion}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUserId: state.users.userId,
		discussion: state.discussion.discussions.filter(d => d.id === state.discussion.discussionId)[0],
	}
}

export default connect(mapStateToProps, { fetchMessages })(Forum);
				// <ForumHeader />
				// <ForumMessagesContainer />
				// <ForumInput />






