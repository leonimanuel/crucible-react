import React, { Component } from 'react';
import "./new-landing-page.scss"
import { Link } from "react-router-dom"

import { activity } from "./landingPageDummyData.js"

import TimelineItemHeader from "../timeline/TimelineItemHeader.js"
import TimelineComment from "../timeline/TimelineComment.js"
import TimelineCommentContent from "../timeline/TimelineCommentContent.js"
import RepliesContainer from "../timeline/RepliesContainer.js"

import { dummyActivities } from "./dummyActivities.js"

class NewLandingPage extends Component {
	componentDidMount() {

	}

	render() {
		const activity = dummyActivities[0]
		const resource = activity.item.object 	

		return (
			<div id="landing-page">
				{
					<div className="timeline-item-container" id="dummy-timeline-item-container">
						<div className="timeline-item-subcontainer">
							<TimelineItemHeader time={activity.time} actor={activity.actor} type="commented on an article"/>
							<div className="timeline-item-content-container">					
								<TimelineComment comment={resource} context={"post"} />
							</div>
						</div>
					</div>		
				}

				<div id="new-landing-buttons-container">
					<Link to="/login"><button className="landing-button" id="landing-login-button">log in</button></Link>
					<Link to="/signup"><button className="landing-button" id="landing-create-account-button">create account</button></Link>
				</div>
			</div>
		)
	}
}


export default NewLandingPage;


