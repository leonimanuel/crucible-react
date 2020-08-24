import React, { Component } from "react";
import { connect } from "react-redux"
import "./interests.css"
import InterestCard from "./InterestCard.js"
import { updateSelectedInterests } from "../../actions/discussionsActions.js"

class Interests extends Component {
	toggleSelect = (interest) => {
		// debugger
		this.props.updateSelectedInterests(interest)
	}

	render() {
		return (
			<div id="interests-wrapper">
				<div id="issues-wrapper" className="interest-section-wrapper">
					<div className="interests-section-name">Voting Issues</div>
					<div className="section-cards-wrapper">{this.props.issues.map(interest => <InterestCard interest={interest} onSelect={this.toggleSelect}/>)}</div>
				</div>
				
				<div id="interests-dividing-line"></div>
				
				<div id="current-events-wrapper" className="interest-section-wrapper">
					<div className="interests-section-name">Current Events</div>
					<div className="section-cards-wrapper">{this.props.currentEvents.map(interest => <InterestCard interest={interest} onSelect={this.toggleSelect}/>)}</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		issues: state.discussions.allInterests.filter(interest => interest.section === "issues"),
		currentEvents: state.discussions.allInterests.filter(interest => interest.section === "current events")
	}
}

export default connect(mapStateToProps, { updateSelectedInterests })(Interests);
