import React from 'react';

import { connect } from "react-redux"

import Reply from "./Reply.js"
import ReplyForm from "./ReplyForm.js"

const RepliesContainer = (props) => {
	const { comment } = props
	return (
		<div className="replies-container">
			<div className="replies-wrapper" key={comment.id}>
				{props.replies.map(reply => <Reply comment={comment} reply={reply}/>)}
			</div>
			<ReplyForm comment={comment} index={props.index}/>
		</div>
	)
}

const mapStateToProps = (state, props) => {
	return {
		replies: state.timeline.replies.filter(reply => reply.comment_id === props.comment.id),
		currentUserId: state.users.userId
	}
}

export default connect(mapStateToProps)(RepliesContainer);