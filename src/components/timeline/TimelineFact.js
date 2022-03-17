import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from "react-redux"
import { addFactFromComment } from "../../actions/discussionsActions.js"

import TimelineItemHeader from "./TimelineItemHeader.js"

class TimelineFact extends Component {
	state = {
		showOriginalFact: false,
		showContext: true
	}	

	handleAddFact = (fact) => {
		console.log("executing handleAddFact")
		// debugger
		this.props.addFactFromComment(fact, fact.collector_id);
	}	

	toggleFactRephrase = () => this.setState({showOriginalFact: !this.state.showOriginalFact});
	toggleFactContext = () => this.setState({showContext: !this.state.showContext})


	generateContext = () => {
		const { fact } = this.props
		const context = fact.node_text.replace(fact.content, `<span class="timeline-fact-highlight">${fact.content}</span>`)
		return context
	}

	render() {
		debugger
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
					{!this.state.showContext && !!fact.rephrase ? <div className="original-vs-rephrase-indicator timeline-fact-option" onClick={this.toggleFactRephrase}> show {this.state.showOriginalFact ? "rephrase" : "original"} </div> : null}					
				</div>

				{
					this.state.showContext 
					?
					<div className="timeline-fact-context-wrapper">
						<div className="timeline-fact-context">...{parse(this.generateContext())}...</div>
						{/*<div className="context-lip"></div>*/}
					</div>
					:
					<div className="timeline-fact-content" style={{border: border}}>
						{/*parse(innerHTML)*/}
						{/*fact.content*/}
						{fact.rephrase ? (this.state.showOriginalFact ? fact.content : fact.rephrase.content) : fact.content}
					</div>					
				}
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

export default connect(mapStateToProps, { addFactFromComment })(TimelineFact);
