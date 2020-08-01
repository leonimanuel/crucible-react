import React, { Component } from 'react';
import { connect } from "react-redux"
import BriefingItem from "../intel/BriefingItem.js"
import BriefingThumbnail from "../intel/BriefingThumbnail.js"

class BriefingsOverview extends Component {
	state = {
		selectedBriefing: ""
	}

	showBriefingThumbnails = (briefings) => {
		return briefings.map((briefing, index) => {
			return (
				<BriefingThumbnail 
					key={briefing.id} 
					briefing={briefing} 
					onBriefingSelect={this.handleBriefingSelection}
				/>
			)					
		})
	}

	handleBriefingSelection = (briefing) => {
		this.setState({selectedBriefing: briefing})
	}

	render() {
		const { briefing, briefings } = this.props
		const { selectedBriefing } = this.state 
		return (
			<div id="briefings-overview" className="overview-wrapper">
				<div className="overview-header" id="briefings-overview-header" >Intel</div>
				<div className="overview-content-container" id="overview-briefings-container">
					{briefings.length ? <BriefingItem briefing={selectedBriefing ? selectedBriefing : briefings[0]} class="overview-selected-briefing"/> : null}
					{this.showBriefingThumbnails(briefings)}				
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		briefings: state.briefings.allBriefings
	}
}

export default connect(mapStateToProps)(BriefingsOverview);