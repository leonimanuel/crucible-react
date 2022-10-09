import React, { Component } from 'react';
import { connect } from "react-redux"
import { withRouter } from "react-router";
import { addFactFromComment } from "../../actions/discussionsActions.js"

import { generateContext, handleArticleClick } from "../../helpers/helpers.js"

import TimelineItemHeader from "./TimelineItemHeader.js"

import Moment from 'react-moment';
import moment from 'moment-timezone';
import parse from 'html-react-parser';


class TimelineFact extends Component {
	state = {
		showOriginalFact: false,
		showContext: true
	}	

	componentDidMount() {
		if (!!this.props.fact.rephrase) {this.setState({showContext: false})}
	}

	handleAddFact = (fact) => {
		this.props.userId ? this.props.addFactFromComment(fact, fact.collector_id) : this.props.history.push("/signup")
		
	}	

	toggleFactRephrase = () => this.setState({showOriginalFact: !this.state.showOriginalFact});
	toggleFactContext = () => this.setState({showContext: !this.state.showContext})

	render() {
		const { fact } = this.props;
		
		// const innerHTML = (fact.node_text) ? `<span>${fact.node_text.replace(fact.content, `<span style="font-weight: bold">${fact.content}</span>`)}</span>` : `<span>${fact.content}</span>`
		let border
		// if (fact.review_status === "pending") {
		// 	border = "3px solid #ff9234" //yellow
		// } else if (fact.review_status === "pass") {
		// 		border = "3px solid green" 		
		// } else {
		// 		border = "3px solid red" 		
		// }
		// let ellipsis = fact.node_text ? "..." : null
		let ellipsis = null
		// if (!fact.article_url.split("/")[2]) {debugger}
		return (
			<div className="timeline-fact-wrapper">
				{!this.props.userFacts.find(f => f.id === fact.id)
					? 
						<button 
							className="add-comment-fact-button" 
							onClick={() => this.handleAddFact(fact)}
						>+</button>
					: 
						null
				}

				<div className="timeline-fact-options-wrapper">
					<div className="show-context-indicator timeline-fact-option" onClick={this.toggleFactContext}> {this.state.showContext ? "hide" : "show"} context</div>	
					<div className="show-context-indicator timeline-fact-option" onClick={() => window.open(fact.article_url,'_blank')}> source</div>	
					{!this.state.showContext && !!fact.rephrase ? <div className="original-vs-rephrase-indicator timeline-fact-option" onClick={this.toggleFactRephrase}> show {this.state.showOriginalFact ? "rephrase" : "original"} </div> : null}					
				</div>

				{
					this.state.showContext 
					?
					<div className="timeline-fact-context-wrapper">
						<a className="article-anchor" href={fact.article_url} onClick={(e, resoure) => handleArticleClick(e, fact)}>{fact.article_title}</a>
						<div className="timeline-fact-context">{ellipsis}{parse(generateContext(fact))}{ellipsis}</div>
						{/*<div className="context-lip"></div>*/}
					</div>
					:
					<div className="timeline-fact-content" style={{border: border}}>
						{/*parse(innerHTML)*/}
						{/*fact.content*/}
						{fact.rephrase ? (this.state.showOriginalFact ? fact.content : fact.rephrase.content) : fact.content}
					</div>					
				}
				<div className="fact-collection-timestamp">collected&nbsp;{<Moment fromNow>{fact.created_at}</Moment>}</div>
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

export default connect(mapStateToProps, { addFactFromComment })(withRouter(TimelineFact));
