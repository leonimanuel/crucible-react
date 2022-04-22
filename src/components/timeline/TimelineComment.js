import React, { Component } from 'react';
import { connect } from "react-redux"
import { addFactFromComment } from "../../actions/discussionsActions.js"
import parse from "html-react-parser";

import TimelineCommentContent from "./TimelineCommentContent.js"
import SupportingFact from "../agora/SupportingFact.js"

import { selectComment } from "../../actions/commentsActions.js"

class TimelineComment extends Component {
	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("object", JSON.stringify({fact: this.props.fact}))
	}

	handleSelectComment = () => {
		// this.props.selectComment(this.props.comment, this.props.userId)
	}

	generateContext = () => {
		const { comment } = this.props
		const context = comment.node_text.replace(comment.selection, `...<span class="timeline-comment-highlight">${comment.selection}</span>...`)
		return context
	}

	render() {		
		const { comment, dummy } = this.props;

		// let border
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
			<div id={`timeline-comment-${comment.id}`} key={comment.id}
			 	className={`timeline-comment timeline-item`} onClick={this.handleSelectComment}>
				{/*<div className="timeline-comment-user-name">{this.props.userId === comment.user_id ? "You" : comment.user.name}</div>*/}
				<div className="timeline-comment-context-wrapper">
					{comment.node_text ? <div className="timeline-comment-context">...{parse(this.generateContext())}...</div> : null}
					{/*<div className="context-lip"></div>*/}
				</div>
				<TimelineCommentContent comment={comment} selectComment={this.handleSelectComment}/>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		userId: state.users.userId
	}
}

export default connect(mapStateToProps, { addFactFromComment, selectComment })(TimelineComment);



