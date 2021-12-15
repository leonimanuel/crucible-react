import React, { Component } from 'react';
import { Route, withRouter, Redirect } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import { connect } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import { API_ROOT } from "../constants"
import "./timeline.scss"

import TimelineFact from "../components/timeline/TimelineFact.js"
import TimelineItemHeader from "../components/timeline/TimelineItemHeader.js"
import TimelineComment from "../components/timeline/TimelineComment.js"
// import { ActionCable } from "react-actioncable-provider";
// import { API_ROOT } from "../constants"

class Timeline extends Component {
	state = {
		timeline_activities: []
	}

	handleArticleClick = (e, resource) => {
		e.preventDefault()
		window.open(resource.article_url,'_blank')
	}

	showTimelineItem = (activity) => {
		const resource = activity.item.object
		switch (activity.item.type) {
			case "fact":
				return (
					<div className="timeline-item-container">
						<TimelineItemHeader actor={activity.actor}/>
						<div className="timeline-item-content-container">							
							<TimelineFact fact={resource}/>
						</div>						
					</div>
				)

			case "comment":
				return (
					<div className="timeline-item-container">
						<TimelineItemHeader actor={activity.actor}/>
						<div className="timeline-item-content-container">
							<div className="timeline-item-article-title">
								<a className="article-anchor" href={resource.article_url} onClick={(e, resoure) => this.handleArticleClick(e, resource)}>{resource.article_title}</a>
							</div> 							
							<TimelineComment comment={resource} />						
						</div>								
					</div>			
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




