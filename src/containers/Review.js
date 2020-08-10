import "./review.css"
import ReviewItemsWrapper from "../components/review/ReviewItemsWrapper.js"

import React, { Component } from 'react';
import { connect } from "react-redux"
// import ReviewItem from "./ReviewItem.js"
import { fetchItemsForReview } from "../actions/reviewsActions.js"

class Review extends Component {
	componentDidMount() {
		this.props.fetchItemsForReview(this.props.userId)
	}

	render() {
		// let sortedItems = this.props.items.sort((a, b) => (a.id > b.id) ? 1 : -1)
		return (
			<div id="review-wrapper">
				<h1 onClick={this.handleClick}>Review</h1>
				<ReviewItemsWrapper />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		items: state.review.allReviewItems,
		userId: state.users.userId
	}
}

export default connect(mapStateToProps, { fetchItemsForReview })(Review);

