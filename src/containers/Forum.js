import React, { Component } from 'react';
import { connect } from "react-redux"

import "./forum.css"
import ForumMessageForm from "../components/agora/forum/ForumMessageForm.js"

class Forum extends Component {
	componentDidUpdate() {
		let messagesContainer = document.getElementById("forum-messages-container");
		// messagesContainer.scrollTo(0, messagesContainer.scrollHeight)
		messagesContainer.scrollTo({top: messagesContainer.scrollHeight, left: 100, behavior: 'smooth'});
	}

	render() {
		debugger
		return (
			<div id="forum-container">
				<div id="forum-header-container">
					HEADER GOES HERE
				</div>

				<div id="forum-messages-container">
					{this.props.discussion.messages.map(m => {
						return (
							<div className={`message-wrapper ${m.user.id === this.props.currentUserId ? "sent" : "received"}`}>
								{m.user.id !== this.props.currentUserId ? <div className="message-user-name">{m.user.name}</div> : null}
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
		discussion: state.discussion.discussion
	}
}

export default connect(mapStateToProps)(Forum);
				// <ForumHeader />
				// <ForumMessagesContainer />
				// <ForumInput />






