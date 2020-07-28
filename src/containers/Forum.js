import React, { Component } from 'react';
import { connect } from "react-redux"
// import { resetUnreadCount } from "../actions/discussionsActions.js"
import { API_ROOT, HEADERS } from "../constants"
import { fetchMessages, zeroUnreadCount } from "../actions/discussionsActions.js"

import "./forum.css"
import ForumMessageForm from "../components/agora/forum/ForumMessageForm.js"
import ForumMessages from "../components/agora/forum/ForumMessages.js"

class Forum extends Component {
	componentDidMount() {
		// debugger
		if (!this.props.messages.length) {
			this.props.fetchMessages(this.props.discussion.group_id, this.props.discussion.id)
		} else {
			this.props.zeroUnreadCount(this.props.discussion.group_id, this.props.discussion.id)
		}
		// this.props.resetUnreadCount(this.props.discussion)
	}

	shouldComponentUpdate(nextProps, nextState) {
		return this.props.discussion === nextProps.discussion
	}

	componentDidUpdate() {
		this.props.zeroUnreadCount(this.props.discussion.group_id, this.props.discussion.id)
	}

	// componentWillUnmount() {
	// 	this.props.zeroUnreadCount(this.props.discussion.group_id, this.props.discussion.id)
	// }

	render() {
		const { discussion } = this.props
		return (
			<div id="forum-container">
				<div id="forum-header-container">
					{discussion.group.name}
				</div>

				<ForumMessages groupId={discussion.group_id} discussionId={discussion.id} messages={this.props.messages} currentUserId={this.props.currentUserId}/>

				<ForumMessageForm discussion={discussion} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUserId: state.users.userId,
		discussion: state.discussions.allDiscussions.find(d => d.id === state.discussions.selectedDiscussionId),
		messages: state.discussions.allMessages.filter(m => m.discussion_id === state.discussions.selectedDiscussionId)
	}
}

export default connect(mapStateToProps, { fetchMessages, zeroUnreadCount })(Forum);





