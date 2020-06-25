import React, { Component } from 'react';
import { Route } from "react-router-dom"
import Article from "../components/agora/Article.js"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"

import "./discussions.css"
import Forum from "./Forum.js"
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants"
import { addMessageToDiscussion } from "../actions/discussionsActions.js"

class Groups extends Component {
	state = {
		renderForum: true
	}

	handleReceivedMessage = response => {
		debugger
		const { message } = response;
		this.props.addMessageToDiscussion(message)
	}

	render() {
		const { match } = this.props;
		return (
			<div id="groups-wrapper">
				{this.props.activeDiscussionId ? 
					<ActionCable 
						channel={{ channel: "MessagesChannel", discussion: this.props.activeDiscussionId}}
						onReceived={this.handleReceivedMessage} 
					/>
				: null}
				<Route path={`${match.path}/:groupId/discussions/:discussionId`} 
					render={routerProps => <Article {...routerProps} />} >
				</Route>
				{this.state.renderForum && this.props.activeDiscussionId ? <Forum discussion={this.props.activeDiscussion}/> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		activeDiscussionId: state.discussion.discussionId
	}
}



export default withRouter(connect(mapStateToProps, { addMessageToDiscussion })(Groups));




