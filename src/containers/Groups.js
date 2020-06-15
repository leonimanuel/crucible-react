import React, { Component } from 'react';
import { Route } from "react-router-dom"
import Article from "../components/agora/Article.js"
import { withRouter } from "react-router-dom";
import "./discussions.css"

class Groups extends Component {
	render() {
		// debugger
		const { match } = this.props;
		return (
			<div id="groups-wrapper">
				
				<Route path={`${match.path}/:groupId/discussions/:discussionName`} 
					render={routerProps => <Article {...routerProps} />} >
				</Route>
			</div>
		)
	}
}


export default withRouter(Groups);