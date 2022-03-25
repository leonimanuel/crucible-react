import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { addFactFromComment } from "../../actions/discussionsActions.js"
import parse from "html-react-parser";

import SupportingFact from "../agora/SupportingFact.js"

import { selectComment } from "../../actions/commentsActions.js"

class TimelineCommentContent extends Component {
	handleAddFact = (fact) => {
		console.log("executing handleAddFact")
		this.props.addFactFromComment(fact, this.props.comment.user_id);
	}

	handleSelectComment = () => {
		// this.props.selectComment(this.props.comment, this.props.userId)
	}

	render() {
		const { comment } = this.props
		let sortedCommentFacts = []
		
		if (comment.fact_order.length == comment.facts.length) {
			comment.fact_order.map((factId, index) => {
				sortedCommentFacts.push(comment.facts.find(fact => fact.id == factId))
			})

			comment.facts = sortedCommentFacts
		}

		return (
			<div className={`timeline-comment-content-wrapper ${this.props.position ? "timeline-position" : ""}`} onClick={this.handleSelectComment}>
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
				<div className="tagged-users-wrapper">
					{this.props.tagged_users.length ? <span>tagged: </span> : null}
					{this.props.tagged_users.map((u, index) => {
						return (
							<React.Fragment>
								<span className="tagged-user"><Link className="tagged-user-link" to={`/profiles/${u.id}`}>{u.handle}</Link>{index == this.props.tagged_users.length-1 ? null : ","} </span>		
							</React.Fragment>
						)
					})}
				</div>
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

export default connect(mapStateToProps, { addFactFromComment, selectComment })(TimelineCommentContent);