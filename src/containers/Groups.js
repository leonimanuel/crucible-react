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
	constructor(props) {
		super(props)
		this.state = {
			renderForum: false,
		}

	}

	componentDidUpdate(previousProps, previousState) {
		if (previousProps.location.pathname !== this.props.location.pathname) {
			this.setState({renderForum: false})
		}
	}

	handleReceivedMessage = response => {
		// debugger
		console.log("handling received message")
		const { message } = response;
		this.props.addMessageToDiscussion(message)
	}

	handleToggleForum = () => {
		this.setState({renderForum: !this.state.renderForum})
	}

	render() {
		const { match } = this.props;
		debugger
		return (
			<div id="groups-wrapper">
				{this.state.renderForum ? 
					<ActionCable 
						channel={{ channel: "MessagesChannel", discussion: this.props.activeDiscussionId}}
						onReceived={this.handleReceivedMessage} 
					/>
				: null}
				<Route path={`${match.path}/:groupName/discussions/:discussionName`} 
					render={routerProps => <Article {...routerProps} onForumClick={this.handleToggleForum}/>} >
				</Route>
				{this.state.renderForum && this.props.activeDiscussionId 
					? <Forum 
							discussion={this.props.activeDiscussion} 
							/> 
					: null
				}
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




