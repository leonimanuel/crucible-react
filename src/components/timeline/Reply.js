import React from 'react';
import { connect } from "react-redux"

import { addFactFromComment } from "../../actions/discussionsActions.js"

import SupportingFact from "../agora/SupportingFact.js"
import TaggedUsers from "./TaggedUsers.js"
import TimelineComment from "./TimelineComment.js"

import Moment from 'react-moment';
import moment from 'moment-timezone';

const Reply = (props) => {
	moment.tz.setDefault("UTC") // VERY IMPORTANT. Otherwise, moment will think the activity timestamp is local timezone

	const handleAddFact = (fact) => {
		props.addFactFromComment(fact, props.message.comment.user_id);
	}

	const { reply, currentUserId } = props
	
	let sortedCommentFacts = []
	if (reply.reply_comment && reply.reply_comment.fact_order.length == reply.reply_comment_facts.length) {
		reply.reply_comment.fact_order.map((factId, index) => {
			sortedCommentFacts.push(reply.reply_comment_facts.find(fact => fact.id == factId))
		})

		reply.reply_comment_facts = sortedCommentFacts
	}
	
	return (
		<div className="reply-container">
			<div className="reply-header">
				<div className="reply-user-handle">{reply.user.handle ? reply.user.handle : "unavailable"}</div>
				{reply.created_at ? <Moment className="reply-timestamp" fromNow>{reply.created_at}</Moment> : null}
			</div>


			{!reply.reply_comment
				?
					<div className="reply-text">{reply.content}</div>
				:
					<TimelineComment comment={reply.reply_comment} hideTaggedUsers={true}/>
			}
				<TaggedUsers tagged_users={reply.tagged_users}/>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		userFacts: state.topics.facts 
	}
}

export default connect(mapStateToProps, { addFactFromComment })(Reply);