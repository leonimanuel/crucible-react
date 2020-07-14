import "./review.css"

import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchItemsForReview } from "../actions/reviewsActions.js"
import ReviewItemsWrapper from "../components/review/ReviewItemsWrapper.js"


class Review extends Component {
	// componentDidMount() {
	// 	this.props.fetchItemsForReview()
	// }

	handleClick = () => {
		this.props.fetchItemsForReview()
	}

	render() {
		return (
			<div id="review-wrapper">
				<h1 onClick={this.handleClick}>Review</h1>
				<ReviewItemsWrapper />
			</div>
		)
	}
}


export default connect(null, { fetchItemsForReview })(Review);