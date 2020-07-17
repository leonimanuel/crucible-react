import React, { Component } from "react";
import { connect } from "react-redux"
import { submitDecision } from "../../actions/reviewsActions.js"

class ReviewItemsWrapper extends Component {
	chooseQuestion = (selectedItem) => {
		switch (selectedItem.type) {
			case "Fact":
				const factQuestionTypes = ["logic", "context", "credibility"]
				let selectedFactQuestionType = factQuestionTypes[Math.floor(Math.random() * factQuestionTypes.length)]
				switch(selectedFactQuestionType) {
					case "logic":
						const logicTotal = selectedItem.logic_upvotes + selectedItem.logic_downvotes
						if (logicTotal < 10) {
							return (
								<React.Fragment>
									<div id="review-question">Is this logically a fact?</div>
									<button onClick={(e) => this.handleDecision(e, "logic")} className="review-decision-button green-decision" data-validity="valid" id="valid-button">valid</button>
									<button onClick={(e) => this.handleDecision(e, "logic")} className="review-decision-button red-decision" data-validity="invalid" id="invalid-button">invalid</button>
									<div id="selected-item">{selectedItem.content}</div>
								</React.Fragment>
							) 
						}
					
					case "context": 
						const contextTotal = selectedItem.context_upvotes + selectedItem.context_downvotes
						if (contextTotal < 10) {
							return (
								<React.Fragment>
									<div id="review-question">Is this fact taken in context? <button>Copy fact and go to source</button></div>
									<button onClick={(e) => this.handleDecision(e, "context")} className="review-decision-button green-decision" data-validity="valid" id="in-context-button">in context</button>
									<button onClick={(e) => this.handleDecision(e, "context")} className="review-decision-button red-decision" data-validity="invalid" id="out-of-context-button">out of context</button>
									<div id="selected-item">{selectedItem.content}</div>
								</React.Fragment>
							)
						} 

					case "credibility": 
						const credibilityTotal = selectedItem.credibility_upvotes + selectedItem.credibility_downvotes
						if (credibilityTotal < 10) {
							return (
								<React.Fragment>
									<div id="review-question">Does this fact come from a credible source, or is it attributed to one? <button>Copy fact and go to source</button></div>
									<button onClick={(e) => this.handleDecision(e, "credibility")} className="review-decision-button green-decision" data-validity="valid" id="credible-button">credible</button>
									<button onClick={(e) => this.handleDecision(e, "credibility")} className="review-decision-button red-decision" data-validity="invalid" id="not-credible-button">not credible</button>
									<div id="selected-item">{selectedItem.content}</div>
								</React.Fragment>
							)
						} 
				}
		

			case "Comment":
				const commentQuestionTypes = ["selection_comment"]
				let selectedCommentQuestionType = commentQuestionTypes[Math.floor(Math.random() * commentQuestionTypes.length)]
				switch (selectedCommentQuestionType) {
					case "selection_comment":
						const selectionCommentTotal = selectedItem.selection_comment_upvotes + selectedItem.selection_comment_downvotes
						if (selectionCommentTotal < 10) {
							return (
								<React.Fragment>
									<div id="review-question">Does this comment respond logically to the article selection?</div>
									<button onClick={(e) => this.handleDecision(e, "selection_comment")} className="review-decision-button green-decision" data-validity="valid" >Yes</button>
									<button onClick={(e) => this.handleDecision(e, "selection_comment")} className="review-decision-button red-decision" data-validity="invalid" >No</button>
									<div id="selected-item">
										<div>{selectedItem.selection}</div>
										<div>{selectedItem.content}</div>
									</div>
								</React.Fragment>									
							)
						}
				}
			

			case "FactsComment":
				const commentFactQuestionTypes = ["comment_fact"]
				let selectedCommentFactQuestionType = commentFactQuestionTypes[Math.floor(Math.random() * commentFactQuestionTypes.length)]
				switch (selectedCommentFactQuestionType) {
					case "comment_fact":
						const CommentFactTotal = selectedItem.comment_fact_upvotes + selectedItem.comment_fact_downvotes
						if (CommentFactTotal < 10) {
							debugger
							return (
								<React.Fragment>
									<div id="review-question">Does this fact support this comment?</div>
									<button onClick={(e) => this.handleDecision(e, "comment_fact")} className="review-decision-button green-decision" data-validity="valid" >Yes</button>
									<button onClick={(e) => this.handleDecision(e, "comment_fact")} className="review-decision-button red-decision" data-validity="invalid" >No</button>
									<div id="selected-item">
										<div>{selectedItem.comment_content}</div>
										<div>{selectedItem.fact_content}</div>
									</div>
								</React.Fragment>									
							)
						}
				}
		}
	}

	renderReviewItems = (items) => {
		return items.map(item => {
			switch(item.type) {
				case "Fact":
					return (
						<div className="review-item">{item.content}</div>
					)
				case "Comment":
					return (
						<div className="review-item">
							<div>{item.selection}</div>
							<div>{item.content}</div>
						</div>
					)
				case "FactsComment":
					return (
						<div className="review-item">
							<div>{item.comment_content}</div>
							<div>{item.fact_content}</div>							
						</div>
					)
			}
		})
	}

	handleDecision = (e, questionType) => {
		const decision = e.target.dataset.validity
		debugger
		this.props.submitDecision(this.props.selectedItem, questionType, decision)
	}

	render() {
		return (
			<div id="review-items-wrapper">
				<div id="review-question-wrapper">
					{this.props.selectedItem ? <div>{this.chooseQuestion(this.props.selectedItem)}</div> : null }					
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



