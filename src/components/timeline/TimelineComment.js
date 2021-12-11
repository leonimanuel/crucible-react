import React, { Component } from 'react';
import { connect } from "react-redux"
import { addFactFromComment } from "../../actions/discussionsActions.js"
import parse from "html-react-parser";

import SupportingFact from "../agora/SupportingFact.js"

class TimelineComment extends Component {
	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("object", JSON.stringify({fact: this.props.fact}))
	}

	handleAddFact = (fact) => {
		console.log("executing handleAddFact")
		this.props.addFactFromComment(fact, this.props.comment.user_id);
	}

	generateContext = () => {
		const { comment } = this.props
		const context = comment.node_text.replace(comment.selection, `<span class="timeline-comment-highlight">${comment.selection}</span>`)
		debugger
		return context
	}


	render() {		
		const { comment } = this.props

		let border
		// if (comment.review_status === "pending" || 
		// 		comment.facts_comments_reviews.some(comment_fact => comment_fact.review_status === "pending")) {
		// 		border = "3px solid #ff9234"
		// } else if (comment.review_status === "pass" && 
		// 				comment.facts_comments_reviews.every(comment_fact => comment_fact.review_status === "pass")) {
		// 		border = "3px solid green"
		// } else {
		// 	border = "3px solid red"
		// }

		return (
			<div className="timeline-comment timeline-item" style={{border: border}}>
				{/*<div className="timeline-comment-user-name">{this.props.userId === comment.user_id ? "You" : comment.user.name}</div>*/}
				<div className="timeline-comment-context">...{parse(this.generateContext())}...</div>				
				<div className="timeline-comment-content">{comment.content}</div>
				
				{comment.facts ? comment.facts.map(fact => {
					return (
						<div className="comment-fact-wrapper">
							{this.props.userId !== comment.user_id && !this.props.userFacts.find(f => f.id === fact.id)
								? 
									<button 
										className="add-comment-fact-button" 
										onClick={() => this.handleAddFact(fact)}
									>+</button>
								: 
									null
							}

							<SupportingFact fact={fact}/>
						</div>
					) 
				}) : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		userId: state.users.userId,
		userFacts: state.topics.facts 
	}
}

export default connect(mapStateToProps, { addFactFromComment })(TimelineComment);



