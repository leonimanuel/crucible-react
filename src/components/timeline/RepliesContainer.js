import React, { useState } from 'react';
import { connect } from "react-redux"
import { withRouter } from "react-router";
import "./replies.scss"

import Reply from "./Reply.js"
import ReplyForm from "./ReplyForm.js"

const RepliesContainer = (props) => {
	const [stateShowReplyForm, setStateShowReplyForm] = useState(false);
	const [showAllReplies, setShowAllReplies] = useState(false);

	const { comment } = props

	const visibleReplies = showAllReplies ? props.replies : props.replies.filter((reply, index) => { return index >= (props.replies.length - 2)})
	
	const handleStartReply = () => {
		props.currentUserId ? setStateShowReplyForm(true) : props.history.push("/signup")
	}

	return (
		<div className="replies-container">
			<div className={`replies-content-container ${props.replies.length || stateShowReplyForm ? "" : "hide"}`}>
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
			
				{stateShowReplyForm ? <ReplyForm comment={comment} index={props.index} closeReplyForm={() => setStateShowReplyForm(false)}/> : null}
			</div>
			
			<React.Fragment>
				{stateShowReplyForm ? null : 
					<div className="reply-button-wrapper">
						<div className="reply-button" onClick={() => handleStartReply() }>{props.currentUserId ? "Reply" : "Join to reply"}</div>					
					</div>
				}
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

export default connect(mapStateToProps)(withRouter(RepliesContainer));