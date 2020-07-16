import React, { Component } from "react";
import { connect } from "react-redux"
import { submitDecision } from "../../actions/reviewsActions.js"

class ReviewItemsWrapper extends Component {
	state = {
		questionType: ""
	}

  // shouldComponentUpdate(nextProps, nextState) { 
  //   if (nextState.questionType !== "") { 
  //     return false;
  //   }
  //   return true;
  // }

	chooseQuestion = () => {
		const questionTypes = ["logic", "context", "credibility"]
		let selectedQuestionType = questionTypes[Math.floor(Math.random() * questionTypes.length)]
		console.log(selectedQuestionType)
		switch(selectedQuestionType) {
			case "logic":
				const logicTotal = this.props.selectedItem.logic_upvotes + this.props.selectedItem.logic_downvotes
				if (logicTotal < 10) {
					if (this.state.questionType !== "logic") this.setState({questionType: "logic"})
					return (
						<React.Fragment>
							<div id="review-question">Is this logically a fact?</div>
							<button onClick={this.handleDecision} className="review-decision-button green-decision" data-validity="valid" id="valid-button">valid</button>
							<button onClick={this.handleDecision} className="review-decision-button red-decision" data-validity="invalid" id="invalid-button">invalid</button>
							<div id="selected-fact">{this.props.selectedItem.content}</div>
						</React.Fragment>
					) 
				}
			
			case "context": 
				const contextTotal = this.props.selectedItem.context_upvotes + this.props.selectedItem.context_downvotes
				if (contextTotal < 10) {
					if (this.state.questionType !== "context") this.setState({questionType: "context"})
					return (
						<React.Fragment>
							<div id="review-question">Is this fact taken in context? <button>Copy fact and go to source</button></div>
							<button onClick={this.handleDecision} className="review-decision-button green-decision" data-validity="valid" id="in-context-button">in context</button>
							<button onClick={this.handleDecision} className="review-decision-button red-decision" data-validity="invalid" id="out-of-context-button">out of context</button>
							<div id="selected-fact">{this.props.selectedItem.content}</div>
						</React.Fragment>
					)
				} else {
				}

			case "credibility": 
				const credibilityTotal = this.props.selectedItem.credibility_upvotes + this.props.selectedItem.credibility_downvotes
				if (credibilityTotal < 10) {
					if (this.state.questionType !== "credibility") this.setState({questionType: "credibility"})
					return (
						<React.Fragment>
							<div id="review-question">Does this fact come from a credit source, or is it attributed to one? <button>Copy fact and go to source</button></div>
							<button onClick={this.handleDecision} className="review-decision-button green-decision" data-validity="valid" id="credible-button">credible</button>
							<button onClick={this.handleDecision} className="review-decision-button red-decision" data-validity="invalid" id="not-credible-button">not credible</button>
							<div id="selected-fact">{this.props.selectedItem.content}</div>
						</React.Fragment>
					)
				} else {
				}
		}
	}

	renderReviewItems = (items) => {
		return items.map(item => {
			console.log(item.type)
			switch(item.type) {
				case "fact":
					return (
						<div>{item.content}</div>
					)
				case "comment":
					return (
						<div>{item.content}</div>
					)
				case "facts_comment":
					return (
						<div>
							<div>{item.comment_content}</div>
							<div>{item.fact_content}</div>							
						</div>
					)
			}
		})
	}

	handleDecision = (e) => {
		const decision = e.target.dataset.validity
		// debugger
		this.props.submitDecision(this.props.selectedItem.id, this.state.questionType, decision)
	}

	render() {
		return (
			<div id="review-items-wrapper">
				<div id="review-question-wrapper">
					{/*this.props.selectedItem ? <div>{this.chooseQuestion()}</div> : null */}					
				</div>

				{this.props.items ? this.renderReviewItems(this.props.items) : null}			
			</div>

		)
	}
}

const mapStateToProps = state => {
	return {
		selectedItem: state.review.itemUnderReview,
		items: state.review.allReviewItems
	}
}


export default connect(mapStateToProps, { submitDecision })(ReviewItemsWrapper);



