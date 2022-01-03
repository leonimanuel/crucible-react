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

import { setActivities } from "../actions/timelineActions.js"

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
						{/*<div className="timeline-item-spacer"></div>						*/}
					</div>
				)

			case "comment":
				return (
					<div className="timeline-item-container">
						<div className="timeline-item-subcontainer">
							<TimelineItemHeader actor={activity.actor}/>
							<div className="timeline-item-content-container" style={{border: this.props.selectedComment.id == resource.id ? "2px solid #0f4c75" : null  }}>
								<div className="timeline-item-article-title">
									<a className="article-anchor" href={resource.article_url} onClick={(e, resoure) => this.handleArticleClick(e, resource)}>{resource.article_title}</a>
								</div> 							
								<TimelineComment comment={resource} />						
							</div>
						</div>
						<div className="timeline-item-spacer">
							<div key={resource.id} className="timeline-spacer-line" style={{visibility: this.props.selectedComment.id == resource.id ? "visible" : "hidden" }}></div>
						</div>								
					</div>			
				) 


			default:
				return <div>Item type not found</div>
		}

	}

	componentDidMount() {
		this.props.setActivities()
	}

	render() {
		return (
			<div id="timeline-wrapper">
					{this.props.timeline_activities.map(activity => this.showTimelineItem(activity))}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		selectedComment: state.comments.selectedComment,
		timeline_activities: state.timeline.activities
	}
}



export default withRouter(connect(mapStateToProps, { setActivities })(Timeline));




