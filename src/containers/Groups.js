import React, { Component } from 'react';
import { Route } from "react-router-dom"
import Article from "../components/agora/Article.js"
import { withRouter } from "react-router-dom";
import "./discussions.css"
import Forum from "./Forum.js"

class Groups extends Component {
	state = {
		renderForum: true
	}

	render() {
		const { match } = this.props;
		return (
			<div id="groups-wrapper">
				<Route path={`${match.path}/:groupId/discussions/:discussionId`} 
					render={routerProps => <Article {...routerProps} />} >
				</Route>
				{this.state.renderForum ? <Forum /> : null}
			</div>
		)
	}
}


export default withRouter(Groups);