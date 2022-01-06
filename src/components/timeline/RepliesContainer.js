import React from 'react';

import Reply from "./Reply.js"
import ReplyForm from "./ReplyForm.js"

const RepliesContainer = (props) => {
	const { comment } = props
	return (
		<div className="replies-container">
			<div className="replies-wrapper" key={comment.id}>
				{comment.replies.map(reply => <Reply reply={reply}/>)}
			</div>
			<ReplyForm comment={comment}/>
		</div>
	)
}

export default RepliesContainer;