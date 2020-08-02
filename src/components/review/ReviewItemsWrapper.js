import React, { Component } from "react";
import { connect } from "react-redux"
import { submitDecision } from "../../actions/reviewsActions.js"

class ReviewItemsWrapper extends Component {
	chooseQuestion = (selectedItem) => {
		switch (selectedItem.type) {
			case "FactRephrase":
				const factRephraseQuestionTypes = ["phrasing"]
				let selectedFactRephraseQuestionType = factRephraseQuestionTypes[Math.floor(Math.random() * factRephraseQuestionTypes.length)]
				switch(selectedFactRephraseQuestionType) {
					case "phrasing":
						const phrasingTotal = selectedItem.phrasing_upvotes + selectedItem.phrasing_downvotes
						if (phrasingTotal < 10) {
							return (
								<React.Fragment>
									<div id="review-question">Is this rephrasing an accurate reflection of the factual information in the source text?</div>
									<button onClick={(e) => this.handleDecision(e, "phrasing")} className="review-decision-button green-decision" data-validity="valid" id="valid-button">good</button>
									<button onClick={(e) => this.handleDecision(e, "phrasing")} className="review-decision-button red-decision" data-validity="invalid" id="invalid-button">problematic</button>
									<div id="selected-item">
										<div><span className="item-bullet">rephrase: </span> {selectedItem.rephrase_content}</div>
										<div><span className="item-bullet">rephrase: </span> {selectedItem.fact_content}</div>
									</div>
								</React.Fragment>
							) 							
						}
						break
					
					default: 
						return <div>CAN'T GENERATE REVIEW</div>
				}
				break		
	
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
									<div id="selected-item"><span className="item-bullet">fact: </span>{selectedItem.content}</div>
								</React.Fragment>
							) 
						}
					break

					case "context": 
						const contextTotal = selectedItem.context_upvotes + selectedItem.context_downvotes
						if (contextTotal < 10) {
							return (
								<React.Fragment>
									<div id="review-question">
										Is this fact taken in context? 
										<button onClick={this.openSource} >Copy fact and go to source</button>
									</div>
									<button onClick={(e) => this.handleDecision(e, "context")} className="review-decision-button green-decision" data-validity="valid" id="in-context-button">in context</button>
									<button onClick={(e) => this.handleDecision(e, "context")} className="review-decision-button red-decision" data-validity="invalid" id="out-of-context-button">out of context</button>
									<div id="selected-item"><span className="item-bullet">fact: </span><span id="fact-content">{selectedItem.content}</span></div>
									<textarea id="holdtext" style={{display: "none"}}></textarea>
								</React.Fragment>
							)
						} 
					break

					case "credibility": 
						const credibilityTotal = selectedItem.credibility_upvotes + selectedItem.credibility_downvotes
						if (credibilityTotal < 10) {
							return (
								<React.Fragment>
									<div id="review-question">
										Does this fact come from a credible source, or is it attributed to one? 
										<button onClick={this.openSource}>Copy fact and go to source</button>
									</div>
									<button onClick={(e) => this.handleDecision(e, "credibility")} className="review-decision-button green-decision" data-validity="valid" id="credible-button">credible</button>
									<button onClick={(e) => this.handleDecision(e, "credibility")} className="review-decision-button red-decision" data-validity="invalid" id="not-credible-button">not credible</button>
									<div id="selected-item"><span className="item-bullet">fact: </span><span id="fact-content">{selectedItem.content}</span></div>
									<textarea id="holdtext" style={{display: "none"}}></textarea>									
								</React.Fragment>
							)
						} 
						break
				
				default: 
					return <div>CAN'T GENERATE REVIEW</div>				
				}	
				break

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
										<div><span className="item-bullet">selection: </span>{selectedItem.selection}</div>
										<div><span className="item-bullet">comment: </span>{selectedItem.content}</div>
									</div>
								</React.Fragment>									
							)
						}
						break

					default: 
						return <div>CAN'T GENERATE REVIEW</div>				
				}
				break

			case "FactsComment":
				const commentFactQuestionTypes = ["comment_fact"]
				let selectedCommentFactQuestionType = commentFactQuestionTypes[Math.floor(Math.random() * commentFactQuestionTypes.length)]
				switch (selectedCommentFactQuestionType) {
					case "comment_fact":
						const CommentFactTotal = selectedItem.comment_fact_upvotes + selectedItem.comment_fact_downvotes
						if (CommentFactTotal < 10) {
							return (
								<React.Fragment>
									<div id="review-question">Does this fact support this comment?</div>
									<button onClick={(e) => this.handleDecision(e, "comment_fact")} className="review-decision-button green-decision" data-validity="valid" >Yes</button>
									<button onClick={(e) => this.handleDecision(e, "comment_fact")} className="review-decision-button red-decision" data-validity="invalid" >No</button>
									<div id="selected-item">
										<div><span className="item-bullet">comment: </span>{selectedItem.comment_content}</div>
										<div><span className="item-bullet">fact: </span>{selectedItem.fact_content}</div>
									</div>
								</React.Fragment>									
							)
						}
						break

					default: 
						return <div>CAN'T GENERATE REVIEW</div>				
				}
				break

			default:
				return <div>CAN'T GENERATE REVIEW</div>
		}
	}

	renderReviewItems = (items) => {
		return items.map(item => {
			switch(item.type) {
				case "Fact":
					return (
						<div className="review-item">Fact: {item.content}</div>
					)
				case "Comment":
					return (
						<div className="review-item">
							<div>Article selection: {item.selection}</div>
							<div>Comment: {item.content}</div>
						</div>
					)
				case "FactsComment":
					return (
						<div className="review-item">
							<div>Comment: {item.comment_content}</div>
							<div>Supporting Fact: {item.fact_content}</div>							
						</div>
					)
				case "FactRephrase":
					return (
						<div className="review-item">
							<div>Rephrase: {item.rephrase_content}</div>
							<div>Source text: {item.fact_content}</div>							
						</div>
					)
				
				default:
					return <div>NO REVIEW TYPE</div>
			}
		})
	}

	openSource = () => {
		console.log("opening source", this.props.selectedItem.url)
		
		const ogText = document.getElementById("fact-content")
		const copyText = document.getElementById("holdtext")
		copyText.innerText = ogText.innerText;
		
		copyText.select();
		document.execCommand("copy");
		alert("Copied the text: " + copyText.value)
		// window.open(this.props.selectedItem.url, "_blank")
	}

	handleDecision = (e, questionType) => {
		const decision = e.target.dataset.validity
		this.props.submitDecision(this.props.selectedItem, questionType, decision)
	}

	render() {
		return (
			<div id="review-items-wrapper">
				<div id="review-question-wrapper">
					{this.props.selectedItem ? <div>{this.chooseQuestion(this.props.selectedItem)}</div> : null }					
				</div>
				<div id="pending-reviews-wrapper">
					{this.props.items ? this.renderReviewItems(this.props.items) : null}							
				</div>
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



