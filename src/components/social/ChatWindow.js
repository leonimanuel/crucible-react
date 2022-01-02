import React, { Component } from 'react';
import { connect } from "react-redux";

// import { resetUnreadCount } from "../actions/discussionsActions.js"
// import { API_ROOT, HEADERS } from "../constants"

import "../../containers/forum.css"
// import ForumMessageForm from "../agora/forum/ForumMessageForm.js"
// import ForumMessages from "../agora/forum/ForumMessages.js"
import ChatMessageForm from "./ChatMessageForm.js"
import CommentMessage from "./CommentMessage.js"

class ChatWindow extends Component {
	componentDidMount() {

	}

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.props.selectedComment != nextProps.selectedComment ||
			this.props.messages != nextProps.messages
		)
	}

	componentDidUpdate() {

	}

	render() {
		const { selectedComment, messages, currentUserId } = this.props
		return (
			<React.Fragment>
				<div id="chat-header-container">
					{selectedComment.content}
				</div>

				<div id="chat-messages-container">
					{messages.map((message, index) => <CommentMessage message={message} index={index} messages={messages} currentUserId={currentUserId}/>)}
				</div>

				<ChatMessageForm comment={selectedComment}/>

{/*				<ForumMessages groupId={discussion.group_id} discussionId={discussion.id} messages={this.props.messages} currentUserId={this.props.currentUserId}/>

				<ForumMessageForm discussion={discussion} /> */}
			</React.Fragment>
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

export default connect(mapStateToProps, { })(ChatWindow);





