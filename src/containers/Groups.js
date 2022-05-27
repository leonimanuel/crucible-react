import React, { Component } from 'react';
import { Route, withRouter, Redirect } from "react-router-dom";
import { useLastLocation } from 'react-router-last-location';
import { connect } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
// import { ActionCable } from "react-actioncable-provider";
// import { API_ROOT } from "../constants"
import { addMessageToDiscussion, toggleForum } from "../actions/discussionsActions.js"
import "./discussions.css"

import Article from "../components/agora/Article.js"
import Forum from "./Forum.js"
import Interests from "../components/agora/Interests.js"


class Groups extends Component {
	// componentDidMount() {
	// 	setTimeout(() => {
	// 		let blob = document.getElementById("blob")
	// 		blob.style.width = "0%"
	// 		blob.style.height = "0%"		
	// 	}, 300)
	// }

	componentDidUpdate(previousProps, previousState) {
		if (previousProps.location.pathname !== this.props.location.pathname) {
			this.props.toggleForum(false)
		}
	}

	handleToggleForum = () => {
		// this.setState({renderForum: !this.state.renderForum})
		this.props.toggleForum()
	}

	render() {
		const { match } = this.props;

		// let blob = document.getElementById("blob")
		// // debugger
		// if (blob.style.width !== "80%") {
		// 	setTimeout(() => blob.style.opacity = "0", 500) 
		// 	// debugger
		// 	setTimeout(() => {
		// 		blob.style.width = "0%"
		// 		blob.style.height = "0%"		
		// 	}, 1000)		
		// } else {
		// 	// debugger
		// 	setTimeout(() => {
		// 		blob.style.width = "0%"
		// 		blob.style.height = "0%"		
		// 	}, 300)			
		// }

		return (
			<div id="groups-wrapper">
				<Route path={`${match.path}/:groupName/discussions/:discussionName`} 
					render={routerProps => {
						return (
							<React.Fragment>
								{this.props.guests && this.props.guests.length ? this.props.guests.map(guest => <div key={uuidv4()} id="guests-wrapper">Guest: {guest.name}</div>) : <div key={uuidv4()} id="guests-wrapper">NO GUESTS</div>}
								<Article {...routerProps} onForumClick={this.handleToggleForum}/>								
							</React.Fragment>
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
		guests: state.discussions.discussionGuests,
	}
}



export default withRouter(connect(mapStateToProps, { toggleForum, addMessageToDiscussion })(Groups));




