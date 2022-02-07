import React, { Component } from 'react';
import { Route, withRouter, Redirect } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import { connect } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { API_ROOT } from "../constants"
import "./timeline.scss"

import TimelineFact from "../components/timeline/TimelineFact.js"
import TimelineItemHeader from "../components/timeline/TimelineItemHeader.js"
import TimelineComment from "../components/timeline/TimelineComment.js"
import TimelineCommentContent from "../components/timeline/TimelineCommentContent.js"
import TimelineReviewItem from "../components/timeline/TimelineReviewItem.js"
import PositionForm from "../components/position/PositionForm.js"
import RepliesContainer from "../components/timeline/RepliesContainer.js"
import MemberCard from "../components/timeline/MemberCard.js"

import { setActivities } from "../actions/timelineActions.js"
import { clearNotificationActivity } from "../actions/notificationsActions.js"
import { clearSelectedContact } from "../actions/networkActions.js"

// import { ActionCable } from "react-actioncable-provider";
// import { API_ROOT } from "../constants"

class Timeline extends Component {
	state = {
		// pagination: 5,
		// page_offset: 0 
	}

	componentDidMount() {
		this.props.setActivities(0);
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
					</div>			
				) 

			default:
				return <div>Item type not found</div>
		}

	}


	fetchMoreActivities = () => {
		alert("fetching more activities");
		const activityId = this.props.timeline_activities.length ? this.props.timeline_activities.at(-1).activity_id : "0"
		this.props.setActivities(activityId);

	}

	refresh = () => {
		debugger
		alert("refreshing")
	}

	renderDivider = () => {
		switch (this.props.timelineType) {
			case "notification": return <div id="back-to-timeline-button" onClick={this.props.clearNotificationActivity}>{"⬅ back to timeline"}</div>
			case "member": return <div id="back-to-timeline-button" onClick={this.props.clearSelectedContact}>{"⬅ back to timeline"}</div>

			default: return
		}
	}

	renderTimelineContent = () => {
		switch (this.props.timelineType) {
			case "feed": return this.props.timeline_activities.map((activity, index) => this.showTimelineItem(activity, index));
			case "notification": return this.showTimelineItem(this.props.selectedNotificationActivity, 0);
			case "member": return this.props.contactFeed.map((activity, index) => this.showTimelineItem(activity, index));

			default: return this.props.timeline_activities.map((activity, index) => this.showTimelineItem(activity, index));
		}
	}

	render() {
		return (
			<div id="timeline-wrapper">
				<div id="timeline-items-wrapper">
					{!this.props.selectedContact ? <PositionForm /> : <MemberCard member={this.props.selectedContact} /> }
					<div id="timeline-divider-wrapper">
						{this.renderDivider()}
						<div id="timeline-divider"> <div id="timeline-divider-line"></div> </div>			
					</div>		

					<InfiniteScroll
					  dataLength={this.props.timeline_activities.length}
					  next={this.fetchMoreActivities}
					  hasMore={true}
					  loader={<h4>Loading...</h4>}
					  endMessage={
					    <p style={{ textAlign: 'center' }}>
					      <b>Yay! You have seen it all</b>
					    </p>
					  }
					  scrollableTarget="timeline-items-wrapper"

					>
						{this.renderTimelineContent()}
					</InfiniteScroll>
				</div>
			</div>				
		)
	}
}

const mapStateToProps = state => {
	return {
		selectedComment: state.comments.selectedComment,
		timeline_activities: state.timeline.activities,
		selectedNotificationActivity: state.notifications.selectedNotificationActivity,
		selectedContact: state.network.selectedContact,
		contactFeed: state.network.contactFeed,
		timelineType: state.timeline.timelineType
	}
}



export default withRouter(connect(mapStateToProps, { setActivities, clearNotificationActivity, clearSelectedContact })(Timeline));




