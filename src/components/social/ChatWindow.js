import React, { Component } from 'react';
import { connect } from "react-redux";

// import { resetUnreadCount } from "../actions/discussionsActions.js"
// import { API_ROOT, HEADERS } from "../constants"
import { getMessagesFromStream } from "../../actions/commentsActions.js"

import "../../containers/forum.css"
// import ForumMessageForm from "../agora/forum/ForumMessageForm.js"
// import ForumMessages from "../agora/forum/ForumMessages.js"
import ChatMessageForm from "./ChatMessageForm.js"
import CommentMessage from "./CommentMessage.js"

class ChatWindow extends Component {
	componentDidMount() {
		// this.props.getMessagesFromStream(this.props.selectedComment.id);
		// if (!this.props.messages.length) {
		// 	this.props.fetchMessages(this.props.discussion.group_id, this.props.discussion.id)
		// } else {
		// 	this.props.zeroUnreadCount(this.props.discussion.group_id, this.props.discussion.id)
		// }
		// // this.props.resetUnreadCount(this.props.discussion)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.props.selectedComment != nextProps.selectedComment ||
			this.props.messages != nextProps.messages
		)
	}

	componentDidUpdate() {
		this.props.getMessagesFromStream(this.props.selectedComment.id, this.props.currentUserId);
		// this.props.zeroUnreadCount(this.props.discussion.group_id, this.props.discussion.id)
	}

	render() {
		const { selectedComment, messages } = this.props
		if (messages) {
			debugger
		}
		return (
			<div>
				<div id="chat-header-container">
					{selectedComment.content}
				</div>

				<div id="chat-messages-container">
					{messages.map(message => <CommentMessage message={message}/>)}
				</div>

				<ChatMessageForm comment={selectedComment}/>

{/*				<ForumMessages groupId={discussion.group_id} discussionId={discussion.id} messages={this.props.messages} currentUserId={this.props.currentUserId}/>

				<ForumMessageForm discussion={discussion} /> */}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUserId: state.users.userId,
		selectedComment: state.comments.selectedComment,
		messages: state.messages.messages
		// discussion: state.discussions.allDiscussions.find(d => d.id === state.discussions.selectedDiscussionId),
		// messages: state.discussions.allMessages.filter(m => m.discussion_id === state.discussions.selectedDiscussionId),
	}
}

export default connect(mapStateToProps, { getMessagesFromStream })(ChatWindow);





