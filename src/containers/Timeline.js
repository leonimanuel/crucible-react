import React, { Component } from 'react';
import { Route, withRouter, Redirect, Link } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import { connect } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import InfiniteScroll from 'react-infinite-scroll-component';
import { API_ROOT } from "../constants"
import { handleArticleClick } from "../helpers/helpers.js"
import mixpanel from 'mixpanel-browser';

import "./timeline.scss"
import "../components/timeline/dropzones.scss"

import TimelineFact from "../components/timeline/TimelineFact.js"
import TimelineItemHeader from "../components/timeline/TimelineItemHeader.js"
import TimelineComment from "../components/timeline/TimelineComment.js"
import TimelineCommentContent from "../components/timeline/TimelineCommentContent.js"
import TimelineReviewItem from "../components/timeline/TimelineReviewItem.js"
import PositionForm from "../components/position/PositionForm.js"
import RepliesContainer from "../components/timeline/RepliesContainer.js"
import MemberCard from "../components/timeline/MemberCard.js"

import GroupCard from "../components/groups/GroupCard.js"


import { setActivities } from "../actions/timelineActions.js"
import { clearNotificationActivity, showPost, readNotification } from "../actions/notificationsActions.js"
import { clearSelectedContact, showSelectedContact } from "../actions/networkActions.js"
import { loadSelectedGroup } from "../actions/groups.js"
import { APP_NAME } from "../constants"


import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import NetworkModal from "../components/network/NetworkModal.js"

import LoadingBar from "../components/tools/LoadingBar.js"

import Moment from 'react-moment';
import moment from 'moment-timezone';

// import { ActionCable } from "react-actioncable-provider";
// import { API_ROOT } from "../constants"

class Timeline extends Component {
	state = {
		location: this.props.location.pathname,
		loadingActivities: false,
		notificationReadOnLoad: false,
		postType: "timeline",
		timelineType: "discoverFeed"
		// pagination: 5,
		// page_offset: 0 
	}

	componentDidMount() {
		this.setState({loadingActivities: true}, () => {
			this.loadActivitiesByFeedType()
		})
		
		if (this.props.location.pathname.includes("posts") && !this.props.selectedNotificationActivity) {
			let locationParams = this.props.location.pathname.split("/").filter(i => i)
			const postObjType = locationParams[1]
			const postObjId = locationParams[2]
			this.props.showPost(postObjType, postObjId)
			this.setState({postType: "posts"})
		}

		if (this.props.location.pathname.split("/")[1] == "profiles") {
			// this.props.showSelectedContact(this.props.location.pathname.split("/")[2])
			this.setState({postType: "profiles"})
		} else if (this.props.location.pathname.split("/")[1] == "groups") {
			this.setState({postType: "groups"})
		}
	}	

	componentDidUpdate(previousProps, previousState) {
		// debugger
		if (this.props.location.pathname !== this.state.location) { // no idea what the point of this is
			this.setState({location: this.props.location.pathname})
			this.loadActivitiesByFeedType()
			if (this.props.location.pathname.split("/")[1] == "profiles") {
				// debugger
				// this.props.showSelectedContact(this.props.location.pathname.split("/")[2])
				this.setState({postType: "profiles"})
			} else if (this.props.location.pathname.split("/")[1] == "groups") {
				this.setState({postType: "groups"})
			}
		}
	}

	showTimelineItem = (activity, index) => {
		const resource = activity.item.object
		let review_resource = {}
		let showTracer = false
		switch (activity.item.type) {
			case "Fact":
				return (
					<div className="timeline-item-container">
						<div className="timeline-item-subcontainer">
							<TimelineItemHeader time={activity.time} actor={activity.actor} type="collected a new excerpt"/>
							<div className="timeline-item-content-container">							
								<TimelineFact fact={resource.fact}/>
							</div>
						</div>				
					</div>
				)
				break

			case "Position":
			case "Comment":
				let postDescription = ""
				if (resource.response_excerpt && resource.content) { postDescription = "commented on an article" }
				else if (resource.response_excerpt && !resource.content) { postDescription = "shared an excerpt" }
				else if (!resource.response_excerpt && resource.content) { postDescription = "shared a thought" }
				review_resource = (activity.item.review_type == "Fact" || activity.item.review_type == "FactsComment") ? activity.item.review_object : resource
				
				showTracer = resource.content && resource.response_excerpt
				return (
					<div className="timeline-item-container">
						<div className="timeline-item-subcontainer">
							<TimelineItemHeader showTracer={showTracer}
								time={activity.time} 
								actor={activity.actor} 
								type={postDescription}
								group={this.state.postType != "groups" && resource.group_id ? {id: resource.group_id, name: resource.group_name} : null }
							/>
							<div className={`timeline-item-content-container ${showTracer ? "show-tracer" : ""}`} style={{border: this.props.selectedComment.id == resource.id ? "2px solid #0f4c75" : null  }}>					
								<TimelineComment comment={resource} context={"post"} showTracer={showTracer} />
								<RepliesContainer comment={resource} index={index}/>						
							</div>
						</div>
					</div>			
				) 
				break

			// case "Position":
			// 	review_resource = (activity.item.review_type == "Fact" || activity.item.review_type == "FactsComment") ? activity.item.review_object : resource
			// 	return (
			// 		<div className="timeline-item-container">
			// 			<div className="timeline-item-subcontainer">
			// 				<TimelineItemHeader time={activity.time} actor={activity.actor} type="created a new position"/>
			// 				<div className="timeline-item-content-container" style={{border: this.props.selectedComment.id == resource.id ? "2px solid #0f4c75" : null  }}>					
			// 					<TimelineCommentContent comment={resource} position={true} tagged_users={activity.item.tagged_users}/>
			// 					<RepliesContainer comment={resource} index={index}/>						
			// 				</div>
			// 				{false && resource.facts_comments_reviews[0].review_status == "pending" 
			// 					&& !!activity.item.reviewable
			// 					&& (index + 1) % Math.floor(Math.random() * 5) === 0 ? <TimelineReviewItem selectedItem={review_resource} type={activity.item.review_type} /> : null}
							
			// 			</div>
			// 		</div>			
			// 	) 

			case "Article_share":
				showTracer = resource.content && resource.source
				return (
					<div className="timeline-item-container">
						<div className="timeline-item-subcontainer">
							<TimelineItemHeader showTracer={showTracer}
								time={activity.time} 
								actor={activity.actor} 
								type="shared an article" 
								group={this.state.postType != "groups" && resource.group_id ? {id: resource.group_id, name: resource.group_name} : null }
							/>
							<div className={`timeline-item-content-container ${showTracer ? "show-tracer" : ""}`} style={{border: this.props.selectedComment.id == resource.id ? "2px solid #0f4c75" : null  }}>
								<div className={`timeline-item-article-wrapper ${showTracer ? "show-tracer" : ""}`}>
									<div className="timeline-item-article-title timeline-article-header">
										<a className="article-anchor" href={resource.article_url} onClick={(e, resoure) => handleArticleClick(e, resource)}>{resource.article_title}</a>
									</div> 	
								</div>						
								{resource.content || resource.response_excerpt ? <TimelineComment comment={resource} showTracer={showTracer} context={"post"}/> : null}
								<RepliesContainer comment={resource} index={index}/>						
							</div>
						</div>
					</div>
				) 
				break

			default:
				return null
		}

	}

	loadActivitiesByFeedType = () => {
		let activityId = ""
		if (this.props.location.pathname.split("/")[1] === "groups") {
			activityId = this.props.groupFeedItems.length ? this.props.groupFeedItems.at(-1).activity_id : "0"
			let groupId = this.props.location.pathname.split("/")[2]
			this.props.loadSelectedGroup(groupId, activityId, this.handleLoad) 
		} else if (this.props.location.pathname.split("/")[1] === "profiles") {
			activityId = this.props.contactFeed.length ? this.props.contactFeed.at(-1).activity_id : "0"
			let profileId = this.props.location.pathname.split("/")[2]
			this.props.showSelectedContact(profileId, activityId, this.handleLoad)
		} 

		// OLD IMPLEMENTATION
		// else {
		// 	const timelineActivities = this.state.timelineType == "discoverFeed" ? this.props.discover_activities : this.props.timeline_activities
		// 	activityId = timelineActivities.length ? timelineActivities.at(-1).activity_id : "0"
		// 	this.props.setActivities(activityId, this.state.timelineType, this.handleLoad);	
		// }		

		// NEW IMPLEMENTATION
		else if (this.props.location.pathname.split("/")[1] === "timeline" 
							|| this.props.location.pathname === "/") {
			const timelineActivities = this.props.timeline_activities
			activityId = timelineActivities.length ? timelineActivities.at(-1).activity_id : "0"
			this.props.setActivities(activityId, "myFeed", this.handleLoad);	
		}

		else if (this.props.location.pathname.split("/")[1] === "discover") {
			const timelineActivities = this.props.discover_activities;
			activityId = timelineActivities.length ? timelineActivities.at(-1).activity_id : "0"
			this.props.setActivities(activityId, "discoverFeed", this.handleLoad);				
		}
	}

	fetchMoreActivities = () => {
		console.log("fetching more activities");
		this.loadActivitiesByFeedType()
		
		mixpanel.track("Load More Activities", {
			feed_type: this.state.postType
		})
	}

	handleLoad = () => {
		this.setState({loadingActivities: false})
	}

	handleNotificationLoad = (objectId, notificationType, notificationGroupId, userId) => {
		if (!this.state.notificationReadOnLoad) {
			this.setState({notificationReadOnLoad: true}, () => { this.props.readNotification(objectId, notificationType, notificationGroupId, userId) })
		}
	}

	handleBacktoTimeline = (previousTimelineType) => {
		if (previousTimelineType == "network") { this.props.clearSelectedContact()}
		else if (previousTimelineType == "post") {this.props.clearNotificationActivity()} 

		this.setState({loadingActivities: true}, () => { this.props.setActivities(0, this.state.timelineType, this.handleLoad) })
	}

	handleFeedTypeSelection = (e) => {
		if (e.target.value != this.state.timelineType) {
			this.setState({timelineType: e.target.value}, () => {
				const timelineActivities = this.state.timelineType == "discoverFeed" ? this.props.discover_activities : this.props.timeline_activities
				const activityId = timelineActivities.length ? timelineActivities.at(-1).activity_id : "0"
				this.props.setActivities(activityId, this.state.timelineType, this.handleLoad)
			})
		}
	}

	refresh = () => {
		alert("refreshing")
	}

	render() {
		const timelineActivities = this.state.timelineType == "discoverFeed" ? this.props.discover_activities : this.props.timeline_activities
		return (
			<div id="timeline-wrapper">
        <Route exact path="/" 
					render={(matchProps) => {
						return (
			        <div id="selection-buttons-wrapper">
			          <div id="selection-buttons-subwrapper">
				          <Link to="/timeline"><button className={`selection-button ${this.state.timelineType === "myFeed" ? "selected" : null}`} value="myFeed" onClick={this.handleFeedTypeSelection}>My Feed</button></Link>
				          <Link to="/discover"><button className={`selection-button ${this.state.timelineType === "discoverFeed" ? "selected" : null}`} value="discoverFeed" onClick={this.handleFeedTypeSelection}>Discover</button></Link>
				          
				          
			          </div>
			        </div>
						)
					}} 
        />

				<div id="timeline-items-wrapper">
					<Route path="/profiles/:id" render={() => this.props.selectedContact ? <MemberCard member={this.props.selectedContact} /> : null } />
					{/*<Route path="/groups/:id" render={(matchProps) => <GroupCard groupId={matchProps.match.params.id} />} />*/}
					<Route exact path="/" render={() => <PositionForm /> } />
					<Route path="/groups/:id" render={() => <PositionForm /> } />

					{/*!this.props.selectedContact ? <PositionForm /> : <MemberCard member={this.props.selectedContact} /> */}
					<div id="timeline-divider-wrapper">
						<Route path="/profiles/:id" render={ (matchProps) => <Link to="/"><div id="back-to-timeline-button" onClick={() => this.handleBacktoTimeline("network")}>{"⬅ back to timeline"}</div></Link> } />						
						{<Route path="/posts/:notificationType/:id" render={ (matchProps) => <Link to="/"><div id="back-to-timeline-button" onClick={() => this.handleBacktoTimeline("post")}>{"⬅ back to timeline"}</div></Link>  } />						}


						{/*this.renderDivider()*/}
						<div id="timeline-divider"> <div id="timeline-divider-line"></div> </div>			
					</div>		

					<div id="new-position-container">
						{this.props.newPositions.map((position, index) => this.showTimelineItem(position, index))}
					</div>

					<Route 
						path="/profiles/:id" 
						render={(matchProps) => {
							return (
								<InfiniteScroll dataLength={this.props.contactFeed.length} next={this.fetchMoreActivities} hasMore={this.props.hasMore} loader={this.props.contactFeed.length > 3 ? <h4>Loading...</h4> : null} endMessage={ <p style={{ textAlign: 'center' }}><b>you've reached the end of this feed.</b></p>} scrollableTarget="timeline-items-wrapper" >
									{this.props.contactFeed.map((activity, index) => this.showTimelineItem(activity, index))}
								</InfiniteScroll>
							)
						}} 
					/>


					<Route 
						path="/groups/:id" 
						render={(matchProps) => {
							return (
								<InfiniteScroll dataLength={this.props.groupFeedItems.length} next={this.fetchMoreActivities} hasMore={this.props.hasMore} loader={this.props.groupFeedItems.length > 3 ? <h4>Loading...</h4> : null} endMessage={ <p style={{ textAlign: 'center' }}><b>you've reached the end of this feed.</b></p>} scrollableTarget="timeline-items-wrapper" >
									{this.props.groupFeedItems.map((activity, index) => this.showTimelineItem(activity, index))}
								</InfiniteScroll>
							)
						}} 
					/>

					<Route 
						path="/posts/:notificationType/:id"
						render={(matchProps) => {
							const objectId = matchProps.match.params.id
							const notificationType = matchProps.match.params.notificationType
							const urlParams = new URLSearchParams(matchProps.location.search);
							for (const [key, value] of urlParams) {
							    if (key == "notificationGroupId") {
							    	const notificationGroupId = value
							  		this.handleNotificationLoad(objectId, notificationType, notificationGroupId, this.props.userId)
							  		
							    }
							}		

							return !!this.props.selectedNotificationActivity ? this.showTimelineItem(this.props.selectedNotificationActivity, 0) : "loading posts"
						}}
					/>

					<Route exact path="/"
						render={(matchProps) => {
							return (
								<InfiniteScroll
								  dataLength={timelineActivities.length}
								  next={this.fetchMoreActivities}
								  hasMore={this.props.hasMore}
								  loader={timelineActivities.length > 3 ? <h4>Loading...</h4> : null}
								  endMessage={
								    <p style={{ textAlign: 'center' }}>
								      <b>You've reached the end of this feed</b>
								    </p>
								  }
								  scrollableTarget="timeline-items-wrapper"

								>

									<Route exact path="/" 
										render={(matchProps) => {
											if (timelineActivities.length) {
												return timelineActivities.map((activity, index) => this.showTimelineItem(activity, index))
											} else if (!this.state.loadingActivities) {
												return (
													<div id="timeline-prompt" className="sidenav-onboarding-prompt">
													  <Popup trigger={<span id="timeline-prompt-popup-trigger">Follow other {APP_NAME} members </span>} position="right center" modal>
													    { close => <NetworkModal handleContactSelect={() => close()}/> }
													  </Popup>															
													   to view their activity here!
													</div>
												) 
											}
										}} 
									/>

									{/*this.renderTimelineContent()*/}
								</InfiniteScroll>
							)
						}}
					/>				
				</div>
				{
					this.state.loadingActivities ? 
					<React.Fragment>
						<LoadingBar />
					</React.Fragment>
					: null 
				}				
			</div>				
		)
	}
}

const mapStateToProps = state => {
	return {
		selectedComment: state.comments.selectedComment,
		timeline_activities: state.timeline.activities,
		discover_activities: state.timeline.discoverActivities,
		newPositions: state.timeline.newPositions,
		selectedNotificationActivity: state.notifications.selectedNotificationActivity,
		selectedContact: state.network.selectedContact,
		selectedGroupId: state.groups.selectedGroupId,
		contactFeed: state.network.contactFeed,
		groupFeedItems: state.groups.selectedGroupFeedItems,
		timelineType: state.timeline.timelineType,
		userId: state.users.userId,
		hasMore: state.timeline.hasMore,
		notification_groups: state.notifications.notification_groups
	}
}



export default withRouter(connect(mapStateToProps, { setActivities, clearNotificationActivity, showPost, readNotification, clearSelectedContact, showSelectedContact, loadSelectedGroup })(Timeline));




