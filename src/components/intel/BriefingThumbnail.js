import React, { Component } from 'react';

class BriefingItem extends Component {

	render() {
		return (
			<div className={`briefing-thumbnail ${this.props.class}`} onClick={this.props.onBriefingSelect}>
				<img className="briefing-thumbnail-image" src="https://i.ibb.co/WGtMN5f/pew-research-center-logo.png" alt=""/>
			</div>
		)
	}
}

export default (BriefingItem);