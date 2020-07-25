import React, { Component } from "react";
import InterestCard from "./InterestCard.js"

class Interests extends Component {
	state = {
		interests: ["Politics", "Science", "Tech"]
	}

	render() {
		return (
			<div id="interests-wrapper">
				{this.state.interests.map(interest => <InterestCard interest={interest} />)}
			</div>
		)
	}
}


export default Interests;