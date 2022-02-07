import React from 'react';
import { connect } from "react-redux"

import { addFactFromComment } from "../../actions/discussionsActions.js"

import SupportingFact from "../agora/SupportingFact.js"


const Reply = (props) => {
	const { reply, currentUserId } = props

	const handleAddFact = (fact) => {
		props.addFactFromComment(fact, props.message.comment.user_id);
	}

	return (
		<div className="reply-container">
			<div className="reply-user-handle">{reply.user.handle ? reply.user.handle : "unavailable"}</div> 

			{!reply.reply_comment
				?
					<div className="reply-text">{reply.content}</div>
				:
					<div className="timeline-comment-content-wrapper">
						<div className="timeline-comment-content">{reply.reply_comment.content}</div>
						
						{reply.reply_comment_facts ? reply.reply_comment_facts.map(fact => {
							return (
								<div className="comment-fact-wrapper">
									{currentUserId !== reply.user.id && !props.userFacts.find(f => f.id === fact.id)
										? 
											<button 
												className="add-comment-fact-button" 
												onClick={() => handleAddFact(fact)}
											>+</button>
										: 
											null
									}

									<SupportingFact fact={fact}/>
								</div>
							) 
						}) : null}
					</div>						

			}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		userFacts: state.topics.facts 
	}
}

export default connect(mapStateToProps, { addFactFromComment })(Reply);