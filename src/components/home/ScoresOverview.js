import React, { Component } from 'react';
import { connect } from "react-redux"
import ScoreBar from "../console/ScoreBar.js"

class ScoresOverview extends Component {
	componentDidMount() {
		this.updateDailyReviewsBar(500)
	}

	updateDailyReviewsBar = (delay) => {
		setTimeout(() => {
			let outerScoreBar = document.getElementById("daily-reviews-bar")
			let scoreBar = document.getElementById("shadow-daily-reviews-bar");
			if (this.props.dailyReviews < 10) {
				scoreBar.style.width = `${this.props.dailyReviews * 10}px`
			} else {
				scoreBar.style.width = "100px"
				outerScoreBar.style.border = "2px solid gold"
			}			
		}, delay)					
	}

	render() {
		if (document.getElementById("shadow-daily-reviews-bar")) {
			this.updateDailyReviewsBar(200)
		}
		return (
			<div id="scores-overview" className="overview-wrapper">
				<div className="overview-header" id="scores-overview-header">Status</div>
				<div className="overview-content-container" id="overview-scores-container">
					<div className="score-type-container" id="reputability-scores-overview-container">
						<div className="score-type-header" id="review-score-header">Reputability</div>
						<div id="accuracy-scorebar"><span>Accuracy: {this.props.accuracyScore}%</span></div>
						<ScoreBar greenScore={this.props.totalUpvotes} redScore={this.props.totalDownvotes}/>
					</div>
					
					<div className="score-type-container" id="review-scores-overview-container">
						<div className="score-type-header" id="review-score-header">Reviews</div>
						<div id="review-scores-content">
							<div>Daily Streak: </div>
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
							<div>{`${this.props.dailyReviews}/10`}</div>
						</div>
						<div id="review-scores-l2">
							<div>Streak: <span>{`${this.props.dailyStreak} Day${this.props.dailyStreak !== 1 ? "s" : ""}`}</span></div>
							<div>Total Score: <span>{this.props.reviewScore}</span></div>
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
		accuracyScore: state.users.userAccuracyScore,
		reviewScore: state.users.userReviewScore,
		dailyReviews: state.users.dailyReviews,
		dailyStreak: state.users.dailyStreak,
		totalUpvotes: state.users.totalUpvotes,
		totalDownvotes: state.users.totalDownvotes				

	}
}

export default connect(mapStateToProps)(ScoresOverview);

