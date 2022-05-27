import React, { Component } from 'react';
import { connect } from "react-redux"
import { Link } from "react-router-dom";
import { addFactFromComment } from "../../actions/discussionsActions.js"
import parse from "html-react-parser";

import SupportingFact from "../agora/SupportingFact.js"
import TimelineFact from "./TimelineFact.js"

import TaggedUsers from "./TaggedUsers.js"

import { selectComment } from "../../actions/commentsActions.js"

import Moment from 'react-moment';
import moment from 'moment-timezone';

class TimelineCommentContent extends Component {
	componentWillMount() {
		// alert(this.props.time.tz(this.props.time, "UTC"))
		moment.tz.setDefault("UTC") // VERY IMPORTANT. Otherwise, moment will think the activity timestamp is local timezone
	}

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

		if (!comment || !comment.fact_order || !comment.facts) {
			debugger
		}
		
		if (comment.fact_order.length == comment.facts.length) {
			comment.fact_order.map((factId, index) => {
				sortedCommentFacts.push(comment.facts.find(fact => fact.id == factId))
			})

			comment.facts = sortedCommentFacts
		}

		return (
			<div className={`timeline-comment-content-wrapper ${this.props.position ? "timeline-position" : ""}`} onClick={this.handleSelectComment}>
				{comment.content ? <div><b>response:</b></div> : null}
				<div className="timeline-comment-content">{comment.content}</div>				
				{comment.facts.length ? <div style={{"margin-top": "10px"}}><b>supporting facts: </b></div> : null}
				{comment.facts ? comment.facts.map(fact => {
					return (
						<div className="supporting-fact-container">							
							<TimelineFact fact={fact}/>
							<div className="fact-collection-timestamp">collected&nbsp;{<Moment fromNow>{fact.created_at}</Moment>}</div>
						</div>
					) 
				}) : null}
				<TaggedUsers tagged_users={comment.tagged_users}/>
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


						{/*<div className="comment-fact-wrapper">
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
						</div>*/}