import React from 'react';
import { connect } from "react-redux"
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./articles.scss"

import Article from "./Article.js"
import GroupCard from "../groups/GroupCard.js"

const ArticlesContainer = (props) => {
	return (
		<div id="articles-container">
			<Route path="/groups/:id" render={(matchProps) => <GroupCard groupId={matchProps.match.params.id} />} />							

			<div id="articles-wrapper">
				<h3 id="articles-header">recommended reading</h3>
				<ul id="articles-list">
					{props.articles.map(a => <Article article={a} />)}	
				</ul>
			</div>
		</div>
	)
}

const mapStateToProps = state => {
	return {
		articles: state.briefings.articles
	}
}

export default connect(mapStateToProps)(ArticlesContainer);