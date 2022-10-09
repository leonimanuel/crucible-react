import React, { Component } from 'react';

import Moment from 'react-moment';
import moment from 'moment-timezone';
import parse from 'html-react-parser';

import { generateContext, handleArticleClick } from "../../helpers/helpers.js"

// This component is specifically for facts in the Chat Drop Zone
class SupportingExcerpt extends Component {
	state = {
		factPosition: "",
		showOriginalFact: false,
		showContext: true
	}

	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("object", JSON.stringify({fact: this.props.fact, origin: "dropzone"}))
		this.setState({factPosition: this.props.facts.indexOf(this.props.fact)})
		
		// e.persist()
		// setTimeout(() => {
		// 	e.target.style.visibility = "hidden"
		// }, 500)
		// setTimeout(() => this.props.handleDrag(this.props.facts.filter(f => f.id != this.props.fact.id)), 200)
		
	}

	endDrag = (e) => {
		// this.props.handleDrag(this.props.facts.splice((this.state.factPosition - 1), 0, this.props.fact))
		// alert("I just got dropped")
		// e.target.style.height = "50px"
		// e.target.style.display = "block"
	}

	toggleFactRephrase = () => this.setState({showOriginalFact: !this.state.showOriginalFact})

	render() {
		const { fact } = this.props;
		let border
		// if (fact.review_status === "pending") {
		// 	border = "3px solid #ff9234" //yellow
		// } else if (fact.review_status === "pass") {
		// 		border = "3px solid green" 		
		// } else {
		// 		border = "3px solid red" 		
		// }
		return (
			<div 
				className="timeline-fact-wrapper"
 				draggable 
 				onDragStart={this.startDrag}			
 				onDragEnd={this.endDrag}					
			>
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
						<div className="timeline-fact-context">{parse(generateContext(fact))}</div>
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
				<div className="remove-fact-button" onClick={() => this.props.sendRemoval(fact.id)}>✕</div>
			</div>		
		)
	}
}


export default SupportingExcerpt;




