import React, { Component } from 'react';
import { connect } from "react-redux"
import ReviewItemsWrapper from "../review/ReviewItemsWrapper.js"

class ReviewsOverview extends Component {

	render() {
		return (
			<div id="reviews-overview" className="overview-wrapper">
				<ReviewItemsWrapper />
			</div>
		)
	}
}

// const mapStateToProps = state => {
// 	return {
// 		discussions: state.discussions.allDiscussions.filter(d => !d.read)
// 	}
// }

export default connect()(ReviewsOverview);