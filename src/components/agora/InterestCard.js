import React, { Component } from "react";

class InterestCard extends Component {
	render() {
		return (
			<div id="interests-wrapper">
				{this.props.interest}
			</div>
		)
	}
}


export default InterestCard;