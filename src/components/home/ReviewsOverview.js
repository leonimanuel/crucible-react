import React, { Component } from 'react';
import { connect } from "react-redux"
import ReviewItemsWrapper from "../review/ReviewItemsWrapper.js"

class ReviewsOverview extends Component {

	render() {
		return (
			<div id="reviews-overview" className="overview-wrapper">
				<div className="overview-header" id="reviews-overview-header" >Reviews</div>
				<div className="overview-content-container" id="overview-reviews-container">
					<ReviewItemsWrapper />
				</div>
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