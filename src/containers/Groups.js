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
				{this.props.activeDiscussion ? 
					<ActionCable 
						channel={{ channel: "MessagesChannel", discussion: this.props.activeDiscussion.id}}
						onReceived={this.handleReceivedMessage} 
					/>
				: null}
				<Route path={`${match.path}/:groupId/discussions/:discussionId`} 
					render={routerProps => <Article {...routerProps} />} >
				</Route>
				{this.state.renderForum && this.props.activeDiscussion ? <Forum discussion={this.props.activeDiscussion}/> : null}
			</div>
		)
	}
}


export default withRouter(connect(state => ({activeDiscussion: state.discussion.discussion}), { addMessageToDiscussion })(Groups));




