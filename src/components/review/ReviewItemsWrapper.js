import React, { Component } from "react";
import { connect } from "react-redux"
import { submitDecision } from "../../actions/reviewsActions.js"

class ReviewItemsWrapper extends Component {
	state = {
		questionType: ""
	}

	chooseQuestion = () => {
		// { selectedFact } = this.props
		const logicTotal = this.props.selectedFact.logic_upvotes + this.props.selectedFact.logic_downvotes
		if (logicTotal < 10) {
			if (this.state.questionType !== "logic") this.setState({questionType: "logic"})
			return <div>Is this logically a fact?</div>
		}
	}

	handleDecision = (e) => {
		const decision = e.target.innerText
		debugger
		this.props.submitDecision(this.props.selectedFact.id, this.state.questionType, decision)
	}

	render() {
		return (
			<div id="review-items-wrapper">
				<div id="review-question-wrapper">
					<div>{this.chooseQuestion()}</div>
					<button onClick={this.handleDecision} className="review-decision-button" id="valid-button">valid</button>
					<button onClick={this.handleDecision} className="review-decision-button" id="invalid-button">invalid</button>
					<div>{this.props.selectedFact.content}</div>
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



