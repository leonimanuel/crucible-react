import React, { Component } from "react";

class InterestCard extends Component {
	render() {
		return (
			<div className="interest-card-wrapper">
				{this.props.interest.title}
			</div>
		)
	}
}


export default InterestCard;