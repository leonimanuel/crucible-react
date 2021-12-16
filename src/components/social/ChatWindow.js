import React, { Component } from 'react';
import { connect } from "react-redux"
// import { resetUnreadCount } from "../actions/discussionsActions.js"
// import { API_ROOT, HEADERS } from "../constants"
import { fetchMessages, zeroUnreadCount } from "../../actions/discussionsActions.js"

import "../../containers/forum.css"
import ForumMessageForm from "../agora/forum/ForumMessageForm.js"
import ForumMessages from "../agora/forum/ForumMessages.js"

class ChatWindow extends Component {
	componentDidMount() {
		// if (!this.props.messages.length) {
		// 	this.props.fetchMessages(this.props.discussion.group_id, this.props.discussion.id)
		// } else {
		// 	this.props.zeroUnreadCount(this.props.discussion.group_id, this.props.discussion.id)
		// }
		// // this.props.resetUnreadCount(this.props.discussion)
	}

	// shouldComponentUpdate(nextProps, nextState) {
	// 	return this.props.discussion === nextProps.discussion
	// }

	// componentDidUpdate() {
	// 	this.props.zeroUnreadCount(this.props.discussion.group_id, this.props.discussion.id)
	// }

	render() {
		const { selectedComment } = this.props
		return (
			<div>
				<div id="chat-header-container">
					{selectedComment.content}
				</div>



{/*				<ForumMessages groupId={discussion.group_id} discussionId={discussion.id} messages={this.props.messages} currentUserId={this.props.currentUserId}/>

				<ForumMessageForm discussion={discussion} /> */}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUserId: state.users.userId,
		selectedComment: state.comments.selectedComment
		// discussion: state.discussions.allDiscussions.find(d => d.id === state.discussions.selectedDiscussionId),
		// messages: state.discussions.allMessages.filter(m => m.discussion_id === state.discussions.selectedDiscussionId),
	}
}

export default connect(mapStateToProps, { fetchMessages, zeroUnreadCount })(ChatWindow);





