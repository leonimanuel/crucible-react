import React from 'react';

const CommentMessage = (props) => {
	const { message, messages, index, currentUserId } = props
	debugger
	return (
		<div 
			key={index} 
			className={`message-wrapper ${message.user.id === currentUserId.toString() ? "sent" : "received"} `}
		>
			{message.user.id !== currentUserId.toString() && (index !== 0 && message.user.id !== props.messages[index-1].user.id)
				? <div className="message-user-name">{message.user.email}</div> 
				: null
			}
			<div className={`message-text ${message.type === "comment" ? "comment-message" : null}`}>
				{message.text}
				{message.type === "comment" ? <span className="comment-label">comment</span> : null}
			</div>
			{message.message_type === "comment" ? <div className="comment-click-hint">click to view</div> : null}
		</div>
	)
}

export default CommentMessage;


// onClick={message.message_type === "comment" ? () => this.scrollToComment(m.previous_el_id) : null}