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

	chooseQuestion = (selectedItem) => {
		debugger
		switch (selectedItem.type) {
			case "fact":
				debugger
				const factQuestionTypes = ["logic", "context", "credibility"]
				let selectedFactQuestionType = factQuestionTypes[Math.floor(Math.random() * factQuestionTypes.length)]
				switch(selectedFactQuestionType) {
					case "logic":
						const logicTotal = selectedItem.logic_upvotes + selectedItem.logic_downvotes
						if (logicTotal < 10) {
							if (this.state.questionType !== "logic") this.setState({questionType: "logic"})
							return (
								<React.Fragment>
									<div id="review-question">Is this logically a fact?</div>
									<button onClick={this.handleDecision} className="review-decision-button green-decision" data-validity="valid" id="valid-button">valid</button>
									<button onClick={this.handleDecision} className="review-decision-button red-decision" data-validity="invalid" id="invalid-button">invalid</button>
									<div id="selected-fact">{selectedItem.content}</div>
								</React.Fragment>
							) 
						}
					
					case "context": 
						const contextTotal = selectedItem.context_upvotes + selectedItem.context_downvotes
						if (contextTotal < 10) {
							if (this.state.questionType !== "context") this.setState({questionType: "context"})
							return (
								<React.Fragment>
									<div id="review-question">Is this fact taken in context? <button>Copy fact and go to source</button></div>
									<button onClick={this.handleDecision} className="review-decision-button green-decision" data-validity="valid" id="in-context-button">in context</button>
									<button onClick={this.handleDecision} className="review-decision-button red-decision" data-validity="invalid" id="out-of-context-button">out of context</button>
									<div id="selected-fact">{selectedItem.content}</div>
								</React.Fragment>
							)
						} else {
						}

					case "credibility": 
						const credibilityTotal = selectedItem.credibility_upvotes + selectedItem.credibility_downvotes
						if (credibilityTotal < 10) {
							if (this.state.questionType !== "credibility") this.setState({questionType: "credibility"})
							return (
								<React.Fragment>
									<div id="review-question">Does this fact come from a credible source, or is it attributed to one? <button>Copy fact and go to source</button></div>
									<button onClick={this.handleDecision} className="review-decision-button green-decision" data-validity="valid" id="credible-button">credible</button>
									<button onClick={this.handleDecision} className="review-decision-button red-decision" data-validity="invalid" id="not-credible-button">not credible</button>
									<div id="selected-item">{selectedItem.content}</div>
								</React.Fragment>
							)
						} 
				}
		

			case "comment":
				const commentQuestionTypes = ["selection_comment"]
				let selectedCommentQuestionType = commentQuestionTypes[Math.floor(Math.random() * commentQuestionTypes.length)]
				switch (selectedCommentQuestionType) {
					case "selection_comment":
						const selectionCommentTotal = selectedItem.selection_comment_upvotes + selectedItem.selection_comment_downvotes
						if (selectionCommentTotal < 10) {
							if (this.state.questionType !== "selection_comment") this.setState({questionType: "selection_comment"})
							return (
								<React.Fragment>
									<div id="review-question">Does this comment respond logically to the article selection?</div>
									<button onClick={this.handleDecision} className="review-decision-button green-decision" data-validity="valid" >Yes</button>
									<button onClick={this.handleDecision} className="review-decision-button red-decision" data-validity="invalid" >No</button>
									<div className="selected-item">
										<div>{selectedItem.selection}</div>
										<div>{selectedItem.content}</div>
									</div>
								</React.Fragment>									
							)
						}
				}
			

			case "facts_comment":
				// debugger
				const commentFactQuestionTypes = ["comment_fact"]
				let selectedCommentFactQuestionType = commentFactQuestionTypes[Math.floor(Math.random() * commentFactQuestionTypes.length)]
				switch (selectedCommentFactQuestionType) {
					case "comment_fact":
						// debugger
						const CommentFactTotal = selectedItem.comment_fact_upvotes + selectedItem.comment_fact_downvotes
						if (CommentFactTotal < 10) {
							if (this.state.questionType !== "fact_comment") this.setState({questionType: "fact_comment"})
							debugger
							return (
								<React.Fragment>
									<div id="review-question">Does this fact support this comment?</div>
									<button onClick={this.handleDecision} className="review-decision-button green-decision" data-validity="valid" >Yes</button>
									<button onClick={this.handleDecision} className="review-decision-button red-decision" data-validity="invalid" >No</button>
									<div className="selected-item">
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
			console.log(item.type)
			switch(item.type) {
				case "fact":
					return (
						<div className="review-item">{item.content}</div>
					)
				case "comment":
					return (
						<div className="review-item">
							<div>{item.selection}</div>
							<div>{item.content}</div>
						</div>
					)
				case "facts_comment":
					return (
						<div className="review-item">
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



