import React, { Component } from 'react';
// import { connect } from "react-redux"
import FactDetailsPane from "./FactDetailsPane.js"

class ConsoleFact extends Component {
	state = {
		showFactDetails: false,
		showOriginalFact: false
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

	render() {
		const { fact } = this.props;

		// const factUpvotes = fact.logic_upvotes + fact.context_upvotes + fact.credibility_upvotes
		// const factDownvotes = fact.logic_downvotes + fact.context_downvotes + fact.credibility_downvotes

		let border
		if (fact.review_status === "pending") {
			border = "2px solid yellow" 
		} else if (fact.review_status === "pass") {
				border = "2px solid green" 		
		} else {
				border = "2px solid red" 		
		}

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
				>
					{fact.rephrase ? (this.state.showOriginalFact ? fact.content : fact.rephrase.content) : fact.content }
				</div>				
			
				{this.state.showFactDetails 
					? 
						<FactDetailsPane 
							fact={fact} 
							factText={this.state.showOriginalFact ? "show rephrase" : "show o.g. fact"} 
							handleContentToggle={this.toggleFactContent}
						/> 
					: 
						null
				}
			</div>
		)
	}
}


export default ConsoleFact;




