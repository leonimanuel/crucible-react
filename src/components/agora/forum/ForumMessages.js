import React, { Component } from 'react';
import { connect } from "react-redux"

class ForumMessages extends Component {
	componentDidMount() {
		console.log("ForumMessages component did mount")
		let messagesContainer = document.getElementById("forum-messages-container");
		messagesContainer.scrollTo({top: messagesContainer.scrollHeight, left: 100, behavior: 'smooth'});
		// this.props.resetUnreadCount(this.props.discussion)
	 //  fetch(`${API_ROOT}/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.id}/unread-messages-count`, {
	 //    method: 'PATCH',
	 //    headers: HEADERS,
	 //  });
	}

	componentDidUpdate() {
		console.log("ForumMessages component did update")
		let messagesContainer = document.getElementById("forum-messages-container");
		// messagesContainer.scrollTo(0, messagesContainer.scrollHeight)
		messagesContainer.scrollTo({top: messagesContainer.scrollHeight, left: 100, behavior: 'smooth'});
	}

	scrollToComment = (previous_el_id) => {
		console.log("scrolling to comment", previous_el_id);
		const previousEl = document.getElementById(previous_el_id);
		let comment
		if (previousEl.tagName === "P") {
			comment = previousEl.firstElementChild;
		} else {
			comment = previousEl.nextElementSibling
		}
		comment.scrollIntoView({behavior: "smooth", block: "center"});
		comment.style.border = "2px solid red"
	}

	render() {
		// debugger
		return (
			<div id="forum-messages-container">
				{this.props.messages 
					? 
						this.props.messages.map((m, index) => {
							// let lastSenderId = m.user.id
							return (
								<div 
									key={index} 
									className={`message-wrapper ${m.user.id === this.props.currentUserId ? "sent" : "received"}`}
									onClick={m.message_type === "comment" ? () => this.scrollToComment(m.previous_el_id) : null}
								>
									{m.user.id !== this.props.currentUserId && (index !== 0 && m.user.id !== this.props.messages[index-1].user.id)
										? <div className="message-user-name">{m.user.name}</div> 
										: null
									}
									<div className="message-text">{m.text}</div>
								</div>
							)
						})
					: 
						null
				}

			</div>
		)
	}
}



export default connect()(ForumMessages);




