import React, { Component } from 'react';
import { connect } from "react-redux"
// import { resetUnreadCount } from "../actions/discussionsActions.js"
import { API_ROOT, HEADERS } from "../constants"
import "./forum.css"
import ForumMessageForm from "../components/agora/forum/ForumMessageForm.js"

class Forum extends Component {
	// componentDidMount() {
		// this.props.resetUnreadCount(this.props.discussion)
	  // fetch(`${API_ROOT}/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.id}/unread-messages-count`, {
	  //   method: 'PATCH',
	  //   headers: HEADERS,
	  // });
	// }

	componentDidUpdate() {
		let messagesContainer = document.getElementById("forum-messages-container");
		// messagesContainer.scrollTo(0, messagesContainer.scrollHeight)
		messagesContainer.scrollTo({top: messagesContainer.scrollHeight, left: 100, behavior: 'smooth'});
	
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
		// debugger
		return (
			<div id="forum-container">
				<div id="forum-header-container">
					{this.props.discussion.group.name}
				</div>

				<div id="forum-messages-container">
					{this.props.discussion.messages.map((m, index) => {
						// let lastSenderId = m.user.id
						return (
							<div key=(index) className={`message-wrapper ${m.user.id === this.props.currentUserId ? "sent" : "received"}`}>
								{m.user.id !== this.props.currentUserId && (index !== 0 && m.user.id !== this.props.discussion.messages[index-1].user.id)
									? <div className="message-user-name">{m.user.name}</div> 
									: null
								}
								<div className="message-text">{m.text}</div>
							</div>
						)
					})
					}
				</div>

				<ForumMessageForm discussion={this.props.discussion}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		currentUserId: state.users.userId,
		// discussion: state.discussion.discussion,
		userId: state.users.userId,
		discussion: state.discussion.discussions.filter(d => d.id === state.discussion.discussionId)[0],
	}
}

export default connect(mapStateToProps)(Forum);
				// <ForumHeader />
				// <ForumMessagesContainer />
				// <ForumInput />






