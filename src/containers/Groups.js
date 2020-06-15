import React, { Component } from 'react';
import { Route } from "react-router-dom"
import Article from "../components/agora/Article.js"
import { withRouter } from "react-router-dom";

class Groups extends Component {
	render() {
		// debugger
		const { match } = this.props;
		return (
			<div id="groups-wrapper">
				<h1>Groups</h1>
				<Route path={`${match.path}/:groupId/discussions/:discussionName`} render={Article}></Route>
			</div>
		)
	}
}


export default withRouter(Groups);