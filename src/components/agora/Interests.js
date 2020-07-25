import React, { Component } from "react";
import "./interests.css"
import InterestCard from "./InterestCard.js"

class Interests extends Component {
	state = {
		// interests: ["Politics", "Science", "Tech"]
		// interests: ["", ""]
		currentEvents: ["covid-19", "black lives matter", "2020 election", "portland protests", "uighur camps", "unemployment", "work from home", "childcare", "hong kong protests"],
		issues: ["climate change", "economy", "healthcare", "immigration", "foreign affairs", "education", "gun control", "police reform", "tech"]
	}

	render() {
		return (
			<div id="interests-wrapper">
				<div id="issues-wrapper">
					<div className="interests-section"></div>Issues
					{this.state.issues.map(interest => <InterestCard interest={interest} />)}
				</div>

				<div id="current-events-wrapper">
					<div className="interests-section"></div>Current Events
					{this.state.currentEvents.map(interest => <InterestCard interest={interest} />)}
				</div>
			</div>
		)
	}
}


export default Interests;
