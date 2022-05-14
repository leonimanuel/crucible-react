import React, { Component } from 'react';
import "./new-landing-page.scss"
import { Link } from "react-router-dom"

import { activity } from "./landingPageDummyData.js"

import TimelineItemHeader from "../timeline/TimelineItemHeader.js"
import TimelineComment from "../timeline/TimelineComment.js"
import TimelineCommentContent from "../timeline/TimelineCommentContent.js"
import RepliesContainer from "../timeline/RepliesContainer.js"

class NewLandingPage extends Component {
	componentDidMount() {

	}

	render() {
		const resource = activity.item.object 	
		return (
			<div id="landing-page">
				{/*
				<div className="timeline-item-container" id="landing-timeline-item">
					<div className="timeline-item-subcontainer">
						<TimelineItemHeader time={activity.time} actor={activity.actor} type="commented on an article"/>
						<div className="timeline-item-content-container">
							<div className="timeline-item-article-title">
								<a className="article-anchor" href={resource.article_url} onClick={(e, resoure) => this.handleArticleClick(e, resource)}>{resource.article_title}</a>
							</div> 							
							<TimelineComment comment={resource} />
							<RepliesContainer comment={resource} />						
						</div>
					</div>
				</div>	
				*/}

				<div id="new-landing-buttons-container">
					<Link to="/login"><button className="landing-button" id="landing-login-button">log in</button></Link>
					<Link to="/signup"><button className="landing-button" id="landing-create-account-button">create account</button></Link>
				</div>
			</div>
		)
	}
}


export default NewLandingPage;