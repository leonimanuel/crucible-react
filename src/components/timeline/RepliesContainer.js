import React from 'react';

import Reply from "./Reply.js"
import ChatMessageForm from "../social/ChatMessageForm.js"

const RepliesContainer = (props) => {
	const { comment } = props
	return (
		<div className="replies-container">
			<div className="replies-wrapper" key={comment.id}>
				{comment.replies.map(reply => <Reply reply={reply}/>)}
			</div>
			<ChatMessageForm comment={comment}/>
		</div>
	)
}

export default RepliesContainer;