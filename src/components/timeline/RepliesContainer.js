import React, { useState } from 'react';
import { connect } from "react-redux"
import "./replies.scss"

import Reply from "./Reply.js"
import ReplyForm from "./ReplyForm.js"

const RepliesContainer = (props) => {
	const [stateShowReplyForm, setStateShowReplyForm] = useState(false);
	const [showAllReplies, setShowAllReplies] = useState(false);

	const { comment } = props

	const visibleReplies = showAllReplies ? props.replies : props.replies.filter((reply, index) => { return index >= (props.replies.length - 2)})
	return (
		<div className="replies-container">
			{ props.replies.length 
				?
					<React.Fragment>
						{props.replies.length ? <div className="replies-header">Replies</div> : null}
						
						{
							(showAllReplies || visibleReplies.length == props.replies.length) ? null : 
							<div className="replies-viewtoggle" onClick={() => setShowAllReplies(true)}>
								show more replies
							</div>
						}


						<div className="replies-wrapper" key={comment.id}>
							{visibleReplies.map(reply => <Reply comment={comment} reply={reply}/>)}
						</div>
					</React.Fragment>
				: null
			}
			
			<React.Fragment>
				{stateShowReplyForm 
					? <ReplyForm comment={comment} index={props.index}/> 
					: <div className="create-first-reply-button" onClick={() => setStateShowReplyForm(true)}>Reply</div>}
			</React.Fragment>			
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