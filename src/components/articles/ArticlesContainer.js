import React from 'react';
import { connect } from "react-redux"
import "./articles.scss"

import Article from "./Article.js"

const ArticlesContainer = (props) => {
	return (
		<div id="articles-container">
			<h3 id="articles-header">recommended reading</h3>
			<ul id="articles-list">
				{props.articles.map(a => <Article article={a} />)}	
			</ul>
		</div>
		
	)
}

const mapStateToProps = state => {
	return {
		articles: state.briefings.articles
	}
}

export default connect(mapStateToProps)(ArticlesContainer);