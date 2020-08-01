import React, { Component } from 'react';
import { connect } from "react-redux"

class BriefingsOverview extends Component {
	showBriefings = (breifings) => {
		debugger
	}

	render() {
		return (
			<div id="briefings-overview" className="overview-wrapper">
				<div className="overview-header" id="briefings-overview-header" >Intel</div>
				<div className="overview-content-container" id="overview-briefings-container">
					{this.showBriefings(this.props.briefings)}				
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