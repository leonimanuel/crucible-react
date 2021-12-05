import React, { Component } from 'react';
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

export default (ReviewsOverview);

// import React, { Component } from 'react';

// class Jobs extends Component {

// 	render() {
// 		return (
// 			<div id="reviews-overview" className="overview-wrapper">
// 			</div>
// 		)
// 	}
// }

// export default Jobs;