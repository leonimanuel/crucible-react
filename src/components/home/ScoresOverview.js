import React, { Component } from 'react';
import { connect } from "react-redux"
import { createPopper } from "@popperjs/core"

import ScoreBar from "../console/ScoreBar.js"
import ScoreOverviewHelper from "../helpers/ScoreOverviewHelper.js"


class ScoresOverview extends Component {
	state = {
		showHelper: false
	}

	componentDidMount() {
		let app = document.querySelector(".App");
		app.style.backgroundColor = "whitesmoke"

		let blob = document.getElementById("blob")
		// blob.style.visibility = "visible"
		blob.style.opacity = "1"
		blob.style.width = "80%"
		blob.style.height = "80%"		
		blob.style.borderRadius = "600px 0px 0px 0px"			
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

	updateDailyFactsCommentsBar = (delay)	=> {
		setTimeout(() => {
			let outerScoreBar = document.getElementById("daily-facts-comments-bar")
			let scoreBar = document.getElementById("shadow-daily-facts-comments-bar");
			if (this.props.dailyFactsComments < 3) {
				scoreBar.style.width = `${this.props.dailyFactsComments * 33.33}px`
			} else {
				scoreBar.style.width = "100px"
				outerScoreBar.style.border = "2px solid gold"
			}			
		}, delay)		
	}

	showHelper = () => {
		this.setState({showHelper: true}, () => {
		let button = document.querySelector("#scores-helper-icon");
			let popup = document.querySelector("#score-overview-helper")
			createPopper(button, popup, {
			  placement: 'left',
			});			
		})
	}

	hideHelper = () => this.setState({showHelper: false})

	render() {
		this.updateDailyReviewsBar(500)
		this.updateDailyFactsCommentsBar(200)
		return (
			<React.Fragment>
				<div id="scores-overview" className="overview-wrapper">
					<div className="helper-icon" id="scores-helper-icon" 
						onMouseEnter={this.showHelper} onMouseLeave={this.hideHelper}>?
					</div>
					<div className="overview-header" id="scores-overview-header">Status</div>
					<div className="overview-content-container" id="overview-scores-container">
						
						<div className="score-type-container" id="reach-scores-overview-container">
							<div className="score-type-header" id="reach-score-header">Reach</div>
							<div>Score: {this.props.reachScore}</div>
							<div className="scores-content" id="reach-scores-content">
								<div>Daily Streak: </div>
								<div className="dailys-bar" id="daily-facts-comments-bar">
									<div className="daily-reviews-notch"></div>
									<div className="daily-reviews-notch"></div>
									<div className="daily-reviews-notch"></div>
								
									<div className="shadow-dailys-bar" id="shadow-daily-facts-comments-bar" ></div>
								</div>
								<div>{`${this.props.dailyFactsComments}/3`}</div>
							</div>						
						</div>					

						<div className="score-type-container" id="reputability-scores-overview-container">
							<div className="score-type-header" id="review-score-header">Reputability</div>
							<div id="accuracy-score-content">
								<div>Accuracy:</div>
								<ScoreBar id="accuracy-scorebar" greenScore={this.props.totalUpvotes} redScore={this.props.totalDownvotes} type="total"/>
								<div>{this.props.accuracyScore}%</div>
							</div>
						</div>
						
						<div className="score-type-container" id="review-scores-overview-container">
							<div className="score-type-header" id="review-score-header">Reviews</div>
							<div className="scores-content" id="review-scores-content">
								<div>Daily Streak: </div>
								<div className="dailys-bar" id="daily-reviews-bar">
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
								
									<div className="shadow-dailys-bar" id="shadow-daily-reviews-bar"></div>
								</div>
								<div>{`${this.props.dailyReviews}/10`}</div>
							</div>
							<div id="review-scores-l2">
								{/*<div>Streak: <span>{`${this.props.dailyStreak} Day${this.props.dailyStreak !== 1 ? "s" : ""}`}</span></div>*/}
								<div>Total Score: <span><b>{this.props.reviewScore}</b></span></div>
							</div>
						</div>
					</div>
				</div>											
				{this.state.showHelper ? <ScoreOverviewHelper id="score-overview-helper" /> : null}
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => {
	return {
		userId: state.users.userId,
		reputabilityScore: state.users.userReputabilityScore,
		accuracyScore: state.users.userAccuracyScore,
		reviewScore: state.users.userReviewScore,
		reachScore: state.users.reachScore,
		dailyReviews: state.users.dailyReviews,
		dailyStreak: state.users.dailyStreak,
		totalUpvotes: state.users.totalUpvotes,
		totalDownvotes: state.users.totalDownvotes,
		dailyFactsComments: state.users.dailyFactsComments				
	}
}

export default connect(mapStateToProps)(ScoresOverview);

