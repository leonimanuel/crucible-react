import React, { useState } from 'react';
import { connect } from "react-redux"
import "./replies.scss"

import Reply from "./Reply.js"
import ReplyForm from "./ReplyForm.js"

const RepliesContainer = (props) => {
	const [stateShowReplyForm, setStateShowReplyForm] = useState(false);

	const { comment } = props
	return (
		<div className="replies-container">
			{ props.replies.length 
				?
					<React.Fragment>
						{props.replies.length ? <div className="replies-header">Replies</div> : null}
						<div className="replies-wrapper" key={comment.id}>
							{props.replies.map(reply => <Reply comment={comment} reply={reply}/>)}
						</div>
						<ReplyForm comment={comment} index={props.index}/>				
					</React.Fragment>
				: 
					<React.Fragment>
						{stateShowReplyForm 
							? <ReplyForm comment={comment} index={props.index}/> 
							: <div className="create-first-reply-button" onClick={() => setStateShowReplyForm(true)}>Reply</div>}
					</React.Fragment>
			}
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