import React, { Component } from 'react';
import { connect } from "react-redux"
import { addFactFromComment } from "../../actions/discussionsActions.js"
import parse from "html-react-parser";
import { FacebookSelector } from '@charkour/react-reactions';

import { generateContext, handleArticleClick } from "../../helpers/helpers.js"


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

	handleReaction = (reactionString) => {
		// reactionString will be something like 'wow' or 'haha' 
		debugger
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
				
				{
					comment.response_excerpt?.content 
						?
					<div className={`timeline-comment-context-wrapper ${this.props.showTracer ? "show-tracer" : ""}`}>
						<div className="article-anchor-wrapper">
							<a className="article-anchor" href={comment.article_url} onClick={(e, resoure) => handleArticleClick(e, comment)}>{comment.article_title}</a>
							<div className="speech-arrow-wrapper">
								<div className={`style context-speech-arrow-liner`}></div>							
								<div className={`style context-speech-arrow ${this.props.context}`}></div>
							</div>
						</div>
						<div className="timeline-comment-context-bubble">
							{comment.response_excerpt?.node_text ? <div className={`timeline-comment-context ${this.props.context}`}>...{parse(generateContext(comment.response_excerpt))}...</div> : <div className="timeline-comment-context">{comment.response_excerpt?.content}</div>}
							
						</div>
						{/*<div className="context-lip"></div>*/}
					</div>
						:
					null
				}
				
				{!comment.content || <TimelineCommentContent comment={comment} selectComment={this.handleSelectComment} showTracer={this.props.showTracer} context={this.props.context}/>}

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
										</div>
									</div>
								) 
							})} 							
						</div>					
					</React.Fragment>
						: 
					null
				}
				{/*<FacebookSelector onSelect={this.handleReaction}/>*/}
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



