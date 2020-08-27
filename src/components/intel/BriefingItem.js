import React, { Component } from 'react';

class BriefingItem extends Component {

	render() {
		return (
			<div className={`briefing-item ${this.props.class}`} id={this.props.id}>
				<div id="briefing-poster">
					<img className="briefing-poster-image" src="https://i.ibb.co/WGtMN5f/pew-research-center-logo.png" alt=""/>				
				</div>
				<div className="briefing-details">
					<div className="briefing-name">{this.props.briefing.name}</div>
					<div className="briefing-description">{this.props.briefing.description}</div>
					<br/>
					<div className="briefing-organization">{this.props.briefing.organization}</div>
				</div>
			</div>
		)
	}
}

export default (BriefingItem);