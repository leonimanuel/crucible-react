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
		return (
			<div id="groups-wrapper">
				<Route path={`${match.path}/:groupName/discussions/:discussionName`} 
					render={routerProps => {
						return (
								<div>
									{this.props.guests ? this.props.guests.map(guest => <div>Guest: {guest.name}</div>) : <div>NO GUESTS</div>}
									<Article {...routerProps} onForumClick={this.handleToggleForum}/>								
								</div>
						)
					} } >
				</Route>
				
				<Route path={"/groups/interests"}
					render={routerProps => <Interests {...routerProps} />} >
				</Route>

				{this.props.renderForum && this.props.selectedDiscussionId ? <Forum /> : null }
				{this.props.renderInterests ? <Interests /> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		selectedDiscussionId: state.discussions.selectedDiscussionId,
		renderForum: state.discussions.renderForum,
		renderInterests: state.groups.renderInterests,
		guests: state.discussions.discussionGuests
	}
}



export default withRouter(connect(mapStateToProps, { toggleForum, addMessageToDiscussion })(Groups));




