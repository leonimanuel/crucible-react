import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchItemsForReview } from "../actions/reviewsActions.js"

class Review extends Component {
	componentDidMount() {
		this.props.fetchItemsForReview()
	}

	render() {
		return (
			<div id="review-wrapper">
				<h1>Review</h1>
			</div>
		)
	}
}


export default connect(null, { fetchItemsForReview })(Review);