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
import TimelineCommentContent from "../components/timeline/TimelineCommentContent.js"
import TimelineReviewItem from "../components/timeline/TimelineReviewItem.js"
import PositionForm from "../components/position/PositionForm.js"
import RepliesContainer from "../components/timeline/RepliesContainer.js"
import { setActivities } from "../actions/timelineActions.js"
import { clearNotificationActivity } from "../actions/notificationsActions.js"

// import { ActionCable } from "react-actioncable-provider";
// import { API_ROOT } from "../constants"

class Timeline extends Component {
	state = {
		// pagination: 5,
		// page_offset: 0 
	}

	handleArticleClick = (e, resource) => {
		e.preventDefault()
		window.open(resource.article_url,'_blank')
	}

	showTimelineItem = (activity, index) => {
		const resource = activity.item.object
		let review_resource = {}
		switch (activity.item.type) {
			case "Fact":
				return (
					<div className="timeline-item-container">
						<div className="timeline-item-subcontainer">
							<TimelineItemHeader actor={activity.actor}/>
							<div className="timeline-item-content-container">							
								<TimelineFact fact={resource}/>
							</div>
						</div>
						<div className="timeline-item-spacer">
							<div key={resource.id} className="timeline-spacer-line"></div>
						</div>						
					</div>
				)

			case "Comment":
				review_resource = (activity.item.review_type == "Fact" || activity.item.review_type == "FactsComment") ? activity.item.review_object : resource
				return (
					<div className="timeline-item-container">
						<div className="timeline-item-subcontainer">
							<TimelineItemHeader actor={activity.actor}/>
							<div className="timeline-item-content-container" style={{border: this.props.selectedComment.id == resource.id ? "2px solid #0f4c75" : null  }}>
								<div className="timeline-item-article-title">
									<a className="article-anchor" href={resource.article_url} onClick={(e, resoure) => this.handleArticleClick(e, resource)}>{resource.article_title}</a>
								</div> 							
								<TimelineComment comment={resource} />
								<RepliesContainer comment={resource} index={index}/>						
							</div>
							{resource.facts_comments_reviews[0].review_status == "pending" 
								&& !!activity.item.reviewable
								&& (index + 1) % Math.floor(Math.random() * 5) === 0 ? <TimelineReviewItem selectedItem={review_resource} type={activity.item.review_type} /> : null}
							
						</div>
						<div className="timeline-item-spacer">
							<div key={resource.id} className="timeline-spacer-line" style={{visibility: this.props.selectedComment.id == resource.id ? "visible" : "hidden" }}></div>
						</div>
					</div>			
				) 

			case "Position":
				review_resource = (activity.item.review_type == "Fact" || activity.item.review_type == "FactsComment") ? activity.item.review_object : resource
				return (
					<div className="timeline-item-container">
						<div className="timeline-item-subcontainer">
							<TimelineItemHeader actor={activity.actor}/>
							<div className="timeline-item-content-container" style={{border: this.props.selectedComment.id == resource.id ? "2px solid #0f4c75" : null  }}>					
								<TimelineCommentContent comment={resource} position={true} />
								<RepliesContainer comment={resource} index={index}/>						
							</div>
							{resource.facts_comments_reviews[0].review_status == "pending" 
								&& !!activity.item.reviewable
								&& (index + 1) % Math.floor(Math.random() * 5) === 0 ? <TimelineReviewItem selectedItem={review_resource} type={activity.item.review_type} /> : null}
							
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
				<div id="timeline-items-wrapper">
					<PositionForm />
					<div id="timeline-divider-wrapper">
						{!!this.props.selectedNotificationActivity ? <div id="back-to-timeline-button" onClick={this.props.clearNotificationActivity}>{"⬅ back to timeline"}</div> : null}
						<div id="timeline-divider"> <div id="timeline-divider-line"></div> </div>			
					</div>		
					
					{
						!!this.props.selectedNotificationActivity 
							? 
								this.showTimelineItem(this.props.selectedNotificationActivity, 0)								
							:
								this.props.timeline_activities.map((activity, index) => this.showTimelineItem(activity, index))
					}
				</div>
			</div>				
		)
	}
}

const mapStateToProps = state => {
	return {
		selectedComment: state.comments.selectedComment,
		timeline_activities: state.timeline.activities,
		selectedNotificationActivity: state.notifications.selectedNotificationActivity
	}
}



export default withRouter(connect(mapStateToProps, { setActivities, clearNotificationActivity })(Timeline));




