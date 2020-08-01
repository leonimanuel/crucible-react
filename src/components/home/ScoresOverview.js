import React, { Component } from 'react';
import { connect } from "react-redux"

class ScoresOverview extends Component {
	componentDidMount() {
		debugger
		let scoreBar = document.getElementById("shadow-daily-reviews-bar");
		if (this.props.dailyReviews < 10) {
			scoreBar.style.width = `${this.props.dailyReviews * 10}px`
		} else {
			scoreBar.style.width = "100px"
		}
		
	}

	render() {
		return (
			<div id="scores-overview" className="overview-wrapper">
				<div className="overview-header" id="scores-overview-header">Status</div>
				<div className="overview-content-container" id="overview-scores-container">
					<div>{this.props.reputabilityScore}</div>
					<div>
						<div>Reviews</div>
						<div id="daily-reviews-bar">
							<div className="daily-reviews-notch"></div>
							<div className="daily-reviews-notch"></div>
							<div className="daily-reviews-notch"></div>
							<div className="daily-reviews-notch"></div>
							<div className="daily-reviews-notch"></div>
							<div className="daily-reviews-notch"></div>
							<div className="daily-reviews-notch"></div>
							<div className="daily-reviews-notch"></div>
							<div className="daily-reviews-notch"></div>
							<div className="daily-reviews-notch"></div>
						
							<div id="shadow-daily-reviews-bar"></div>
						</div>

					</div>
				</div>
			</div>			
		)
	}
}

const mapStateToProps = state => {
	return {
		reputabilityScore: state.users.userReputabilityScore,
		reviewScore: state.users.userReviewScore,
		dailyReviews: state.users.user.daily_reviews
	}
}

export default connect(mapStateToProps)(ScoresOverview);