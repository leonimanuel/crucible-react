import React, { Component } from 'react';
import { connect } from "react-redux"
import { addFactFromComment } from "../../actions/discussionsActions.js"
import parse from "html-react-parser";

import TimelineCommentContent from "./TimelineCommentContent.js"
import SupportingFact from "../agora/SupportingFact.js"

import TimelineFact from "./TimelineFact.js"
import TaggedUsers from "./TaggedUsers.js"

import Moment from 'react-moment';
import moment from 'moment-timezone';

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
		const context = comment.node_text.replace(comment.selection, `<span class="timeline-comment-highlight">${comment.selection}</span>`)
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
				<div className="timeline-comment-context-wrapper bubble">
					{/*comment.selection ? <div style={{"margin-top": "10px"}}><b>article excerpt:</b></div> : null */}
					{comment.selection ? <div style={{"margin-top": "10px"}}>{<a className="article-anchor" href={comment.article_url} onClick={(e, resoure) => this.props.onArticleClick(e, comment)}>{comment.article_title}</a>}</div> : null }
					<div className="timeline-comment-context-bubble">
						{comment.node_text ? <div className="timeline-comment-context">...{parse(this.generateContext(comment))}...</div> : <div className="timeline-comment-context">{comment.selection}</div>}
					</div>
					{/*<div className="context-lip"></div>*/}
				</div>
				<TimelineCommentContent comment={comment} selectComment={this.handleSelectComment}/>

				{
					comment.facts.length 
						? 
					<React.Fragment>
						<div className="supporting-facts-wrapper">
							{comment.facts.map((fact, index) => {
								return (
									<div className="supporting-fact-style-container">
										<div className="style supporting-fact-connector-boxes-container">
											<div className="style supporting-fact-connector-box top-connector-box"></div>
											<div className={`style supporting-fact-connector-box ${index+1 != comment.facts.length ? `bottom-connector-box` : null}`}></div>
										</div>
										<div className="supporting-fact-container">							
											<TimelineFact fact={fact}/>
											<div className="fact-collection-timestamp">collected&nbsp;{<Moment fromNow>{fact.created_at}</Moment>}</div>
										</div>
									</div>
								) 
							})} 							
						</div>					
					</React.Fragment>
						: 
					null
				}
				<TaggedUsers tagged_users={comment.tagged_users}/>

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



