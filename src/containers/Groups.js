import React, { Component } from 'react';
import { Route } from "react-router-dom"
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import { ActionCable } from "react-actioncable-provider";
import { API_ROOT } from "../constants"
import { addMessageToDiscussion, toggleForum } from "../actions/discussionsActions.js"
import "./discussions.css"

import Article from "../components/agora/Article.js"
import Forum from "./Forum.js"
import Interests from "../components/agora/Interests.js"

class Groups extends Component {
	// constructor(props) {
	// 	super(props)
	// 	this.state = {
	// 		renderForum: false,
	// 	}

	// }

	componentDidUpdate(previousProps, previousState) {
		if (previousProps.location.pathname !== this.props.location.pathname) {
			// this.setState({renderForum: false})
			this.props.toggleForum(false)
		}
	}

	handleToggleForum = () => {
		// this.setState({renderForum: !this.state.renderForum})
		this.props.toggleForum()
	}

	render() {
		const { match } = this.props;
		debugger
		return (
			<div id="groups-wrapper">
				<Route path={`${match.path}/:groupName/discussions/:discussionName`} 
					render={routerProps => <Article {...routerProps} onForumClick={this.handleToggleForum}/>} >
				</Route>
				
				<Route path={"/groups/interests"}>
					<div>INTERESNA</div>
				</Route>

				{this.props.renderForum && this.props.selectedDiscussionId ? <Forum /> : null }
				{this.props.renderInterests ? <Interests /> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	debugger
	return {
		selectedDiscussionId: state.discussions.selectedDiscussionId,
		renderForum: state.discussions.renderForum,
		renderInterests: state.groups.renderInterests
	}
}



export default withRouter(connect(mapStateToProps, { toggleForum, addMessageToDiscussion })(Groups));




