import React, { Component } from "react";
import { connect } from "react-redux"
import "./interests.css"
import InterestCard from "./InterestCard.js"
import { fetchInterests } from "../../actions/discussionsActions.js"

class Interests extends Component {
	state = {
		// interests: ["Politics", "Science", "Tech"]
		// interests: ["", ""]
		currentEvents: ["covid-19", "black lives matter", "2020 election", "portland protests", "uighur camps", "unemployment", "work from home", "childcare", "HK protests", "opioid crisis"],
		issues: ["climate change", "economy", "healthcare", "immigration", "foreign affairs", "education", "gun control", "police reform", "tech", "culture"]
	}

	componentDidMount() {
		this.props.fetchInterests()
	}

	render() {
		return (
			<div id="interests-wrapper">
				<div id="issues-wrapper" className="interest-section-wrapper">
					<div className="interests-section-name">Issues</div>
					<div className="section-cards-wrapper">{this.state.issues.map(interest => <InterestCard interest={interest} />)}</div>
				</div>
				
				<div id="interests-dividing-line"></div>
				
				<div id="current-events-wrapper" className="interest-section-wrapper">
					<div className="interests-section-name">Current Events</div>
					<div className="section-cards-wrapper">{this.state.currentEvents.map(interest => <InterestCard interest={interest} />)}</div>
				</div>
			</div>
		)
	}
}


export default connect(null, { fetchInterests })(Interests);
