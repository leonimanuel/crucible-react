import React, { Component } from 'react';
import { Route, withRouter, Redirect } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import { connect } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import { API_ROOT } from "../constants"

import TimelineFact from "../components/timeline/TimelineFact.js"
// import { ActionCable } from "react-actioncable-provider";
// import { API_ROOT } from "../constants"
import "./timeline.css"

class Timeline extends Component {
	state = {
		timeline_activities: []
	}

	showTimelineItem = (activity) => {
		// debugger
		switch (activity.item.type) {
			case "fact":
				return (
					// <div>{activity.item.content}</div>
					<TimelineFact fact={activity.item.object}/>
				)

			default:
				return <div>Item type not found</div>
		}

	}

	componentDidMount() {
		let configObj = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.getItem("token")
			}
		}

		fetch(API_ROOT + "/timeline", configObj)
			.then(resp => resp.json())
			.then(activities => {
				this.setState({timeline_activities: activities})
			})			
	}

	render() {
		return (
			<div id="timeline-wrapper">
				{this.state.timeline_activities.map(activity => this.showTimelineItem(activity))}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
	}
}



export default withRouter(connect(mapStateToProps)(Timeline));




