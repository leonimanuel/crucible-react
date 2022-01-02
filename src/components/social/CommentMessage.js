import React from 'react';
import { connect } from "react-redux"
import SupportingFact from "../agora/SupportingFact.js"

import { addFactFromComment } from "../../actions/discussionsActions.js"

const CommentMessage = (props) => {
	const { message, messages, index, currentUserId } = props

	const handleAddFact = (fact) => {
		console.log("executing handleAddFact")
		props.addFactFromComment(fact, props.message.comment.user_id);
	}

	return (
		<div 
			key={index} 
			className={`message-wrapper ${message.user.id === currentUserId.toString() ? "sent" : "received"} `}
		>
			{message.user.id !== currentUserId.toString() && (index !== 0 && message.user.id !== props.messages[index-1].user.id)
				? <div className="chat-message-user-name">{message.user.handle}</div> 
				: null
			}
			
			{ !message.comment_id
				?
					<div className={`chat-message-text ${message.type === "comment" ? "comment-message" : null}`}>
						{message.text}
						{message.type === "comment" ? <span className="comment-label">comment</span> : null}
					</div>					

				: 
					<div className="timeline-comment-content-wrapper">
						<div className="timeline-comment-content">{message.comment.content}</div>
						
						{message.comment.facts ? message.comment.facts.map(fact => {
							return (
								<div className="comment-fact-wrapper">
									{currentUserId !== message.comment.user_id && !props.userFacts.find(f => f.id === fact.id)
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

			{/*{message.message_type === "comment" ? <div className="comment-click-hint">click to view</div> : null}*/}
		</div>
	)
}

const mapStateToProps = state => {
	return {
		// userId: state.users.userId,
		userFacts: state.topics.facts 
	}
}

export default connect(mapStateToProps, { addFactFromComment })(CommentMessage) ;


// onClick={message.message_type === "comment" ? () => this.scrollToComment(m.previous_el_id) : null}