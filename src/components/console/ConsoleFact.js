import React, { Component } from 'react';
// import { connect } from "react-redux"
import ShowMoreIcon from "./down-arrow-icon.svg"
import FactDetailsPane from "./FactDetailsPane.js"

class ConsoleFact extends Component {
	state = {
		showFactDetails: false,
		showOriginalFact: false,
		showArrow: false
	}

	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("object", JSON.stringify({parentTopic: this.props.parentTopic, fact: this.props.fact}))
	}

	toggleFactDetailPane = () => {
		this.setState({showFactDetails: !this.state.showFactDetails})
	}

	toggleFactContent = () => {
		this.setState({showOriginalFact: !this.state.showOriginalFact})
	}

	copyFact = () => {
	  const el = document.createElement('textarea');
	  el.value = this.props.fact.content;
	  document.body.appendChild(el);
	  el.select();
	  document.execCommand('copy');
	  document.body.removeChild(el);

	  // window.open(url,'_blank');
	};	

	toggleArrow = (bool) => {
		this.setState({showArrow: bool})
	}

	render() {
		const { fact } = this.props;

		// const factUpvotes = fact.logic_upvotes + fact.context_upvotes + fact.credibility_upvotes
		// const factDownvotes = fact.logic_downvotes + fact.context_downvotes + fact.credibility_downvotes

		let border
		// if (fact.review_status === "pending") {
		// 	border = "3px solid #ff9234" //yellow
		// } else if (fact.review_status === "pass") {
		// 		border = "3px solid green" 		
		// } else {
		// 		border = "3px solid red" 		
		// }

		const factDetails = document.getElementById(`fact-details-${fact.id}`)		
		if (factDetails) {
			factDetails.style.maxHeight = this.state.showFactDetails ? "200px" : "0px"
		}

		const arrowRotation = this.state.showFactDetails ? "-135deg" : "45deg"
		return (
			<div 
				className={`fact-box ${this.state.showFactDetails ? "expanded-fact" : "truncated-fact"}`}
				style={{border: fact ? border : "2px solid black"}} 
			>
				<div 
					id={`${this.props.parentTopic.name}-fact-${fact.id}`} 
					className={`console-fact-content`}
	 				draggable 
	 				onDragStart={this.startDrag}
	 				onClick={this.toggleFactDetailPane}
	 				onMouseEnter={() => this.toggleArrow(true)}
	 				onMouseLeave={() => this.toggleArrow(false)}
				>
					{fact.rephrase ? (this.state.showOriginalFact ? fact.content : fact.rephrase.content) : fact.content }
					{/*<img className="show-more-fact-icon" src={ShowMoreIcon} alt="show-more-icon" width="30px"/>*/}
					{this.state.showArrow ? <div className="fact-arrow-wrapper"><i class={`fact-arrow`} style={{"transform": `rotate(${arrowRotation})`, "-webkit-transform": `rotate(${arrowRotation})`}}></i></div> : null}
				</div>				

						<FactDetailsPane 
							fact={fact}
							id={`fact-details-${fact.id}`} 
							factText={this.state.showOriginalFact ? "show rephrase" : "show o.g. fact"} 
							handleContentToggle={this.toggleFactContent}
							onCopy={this.copyFact}
						/> 


				{/**/}
			</div>
		)
	}
}


export default ConsoleFact;




