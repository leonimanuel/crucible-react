import React, { Component } from 'react';
import { connect } from "react-redux"
import { addFactFromComment } from "../../actions/discussionsActions.js"

class ArticleComment extends Component {
	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("object", JSON.stringify({fact: this.props.fact}))
	}

	handleAddFact = (fact) => {
		console.log("executing handleAddFact")
		this.props.addFactFromComment(fact, this.props.comment.user_id);
	}

	render() {		
		const { comment } = this.props

		let border
		if (comment.review_status === "pending" || 
				comment.facts_comments_reviews.some(comment_fact => comment_fact.review_status === "pending")) {
				border = "3px solid yellow"
		} else if (comment.review_status === "pass" && 
						comment.facts_comments_reviews.every(comment_fact => comment_fact.review_status === "pass")) {
				border = "3px solid green"
		} else {
			border = "3px solid red"
		}

		return (
			<div id={this.props.id} className="popup" style={{border: border}}>
				<div className="comment-user-name">{this.props.userId === comment.user_id ? "You" : comment.user.name}</div>
				<div className="comment-content">{comment.content}</div>
				
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

							<div className="comment-fact">{fact.content}</div>
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

export default connect(mapStateToProps, { addFactFromComment })(ArticleComment);



