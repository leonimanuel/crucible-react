import React, { Component } from "react";
import { connect } from "react-redux"

class ReviewItemsWrapper extends Component {
	render() {
		return (
			<div id="review-items-wrapper">
				{this.props.facts.map(fact => <div className="review-fact">{fact.content}</div>)}				
			</div>

		)
	}
}

const mapStateToProps = state => {
	return {
		facts: state.review.allReviewFacts
	}
}


export default connect(mapStateToProps)(ReviewItemsWrapper);