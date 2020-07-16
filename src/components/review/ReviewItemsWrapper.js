import React, { Component } from "react";
import { connect } from "react-redux"
import { submitDecision } from "../../actions/reviewsActions.js"

class ReviewItemsWrapper extends Component {
	state = {
		questionType: ""
	}

  shouldComponentUpdate(nextProps, nextState) { 
    if (nextState.questionType !== "") { 
      return false;
    }
    return true;
  }

	chooseQuestion = () => {
		debugger
		const questionTypes = ["logic", "context", "legitimacy"]
		let selectedQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)]
		console.log(selectedQuestionType)
		switch(selectedQuestionType) {
			case "logic":
				const logicTotal = this.props.selectedFact.logic_upvotes + this.props.selectedFact.logic_downvotes
				debugger
				if (logicTotal < 10) {
					if (this.state.questionType !== "logic") this.setState({questionType: "logic"})
					return (
						<React.Fragment>
							<div>Is this logically a fact?</div>
							<button onClick={this.handleDecision} className="review-decision-button green-decision" id="valid-button">valid</button>
							<button onClick={this.handleDecision} className="review-decision-button red-decision" id="invalid-button">invalid</button>
						</React.Fragment>
					) 
				}
			
			case "context": 
				debugger
				const contextTotal = this.props.selectedFact.context_upvotes + this.props.selectedFact.context_downvotes
				if (contextTotal < 10) {
					if (this.state.questionType !== "context") this.setState({questionType: "context"})
					debugger
					return (
						<React.Fragment>
							<div>Is this fact taken in context? <button>Copy fact and go to source</button></div>
							<button onClick={this.handleDecision} className="review-decision-button green-decision" id="in-context-button">in context</button>
							<button onClick={this.handleDecision} className="review-decision-button red-decision" id="out-of-context-button">out of context</button>
						</React.Fragment>
					)
				} else {
					debugger
				}

			case "legitimacy": 
				debugger
				const legitimacyTotal = this.props.selectedFact.legitimacy_upvotes + this.props.selectedFact.legitimacy_downvotes
				if (legitimacyTotal < 10) {
					if (this.state.questionType !== "legitimacy") this.setState({questionType: "legitimacy"})
					debugger
					return (
						<React.Fragment>
							<div>Does this fact come from a credit source, or is it attributed to one? <button>Copy fact and go to source</button></div>
							<button onClick={this.handleDecision} className="review-decision-button green-decision" id="credible-button">credible</button>
							<button onClick={this.handleDecision} className="review-decision-button red-decision" id="not-credible-button">not credible</button>
						</React.Fragment>
					)
				} else {
					debugger
				}
		}
	}

	handleDecision = (e) => {
		const decision = e.target.innerText
		// debugger
		this.props.submitDecision(this.props.selectedFact.id, this.state.questionType, decision)
	}

	render() {
		return (
			<div id="review-items-wrapper">
				<div id="review-question-wrapper">
					{this.props.selectedFact ? <div>{this.chooseQuestion()}</div> : null }					
					<div id="selected-fact">{this.props.selectedFact.content}</div>
					<div>{this.props.selectedFact.logic_upvotes}</div>
					<div>{this.props.selectedFact.logic_downvotes}</div>
				</div>
				
				{this.props.facts.map(fact => <div className="review-fact">{fact.content}</div>)}				
			</div>

		)
	}
}

const mapStateToProps = state => {
	return {
		selectedFact: state.review.factUnderReview,
		facts: state.review.allReviewFacts
	}
}


export default connect(mapStateToProps, { submitDecision })(ReviewItemsWrapper);



