import React, { Component } from "react";

class InterestCard extends Component {
	render() {
		return (
			<div id="interest-wrapper">
				{this.props.interest}
			</div>
		)
	}
}


export default InterestCard;