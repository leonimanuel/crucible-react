import React, { Component } from "react";

class InterestCard extends Component {
	render() {
		const { interest } = this.props
		return (
			<div className={`interest-card-wrapper ${interest.selected ? "selected-interest" : null}`} onClick={() => this.props.onSelect(interest)}>
				{interest.title}
			</div>
		)
	}
}


export default InterestCard;