import React, { Component } from 'react';
import { connect } from "react-redux"

class ScoresOverview extends Component {

	render() {
		return (
			<div id="scores-overview" className="overview-wrapper">
				<div className="overview-header" id="scores-overview-header">Status</div>
				<div className="overview-content-container" id="overview-scores-container">
					<div>{this.props.reputabilityScore}</div>
					<div>{this.props.reviewScore}</div>
				</div>
			</div>			
		)
	}
}

const mapStateToProps = state => {
	return {
		reputabilityScore: state.users.userReputabilityScore,
		reviewScore: state.users.userReviewScore
	}
}

export default connect(mapStateToProps)(ScoresOverview);