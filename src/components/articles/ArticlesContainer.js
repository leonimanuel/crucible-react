import React from 'react';
import { connect } from "react-redux"
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./articles.scss"

import Article from "./Article.js"
import GroupCard from "../groups/GroupCard.js"

const ArticlesContainer = (props) => {
	const staticArticles = [
		{
			url: "https://www.nytimes.com/2022/09/13/business/economy/income-poverty-census-bureau.html?name=styln-us-economy&region=TOP_BANNER&block=storyline_menu_recirc&action=click&pgtype=Article&variant=show&is_new=false",
			title: "Pandemic Aid Cut U.S. Poverty to New Low in 2021, Census Bureau Reports"
		},
		{
			url: "https://www.theatlantic.com/ideas/archive/2022/09/ukraine-victory-russia-putin/671405/",
			title: "It’s Time to Prepare for a Ukrainian Victory"	
		},
		{
			url: "https://www.brookings.edu/blog/up-front/2022/08/30/its-getting-more-expensive-to-raise-children-and-government-isnt-doing-much-to-help/",
			title: "It’s getting more expensive to raise children. And government isn’t doing much to help."
		},
		{
			url: "https://www.pewresearch.org/religion/2022/09/13/modeling-the-future-of-religion-in-america/",
			title: "Modeling the Future of Religion in America"
		},
		{
			url: "https://theintercept.com/2022/09/07/facebook-personal-data-no-accountability/",
			title: "Facebook Engineers: We have no idea where we keep all your personal data"
		}
	]

	return (
		<div id="articles-container">
			<Route path="/groups/:id" render={(matchProps) => <GroupCard groupId={matchProps.match.params.id} />} />							

			<div id="articles-wrapper">
				<h3 id="articles-header">recommended reading</h3>
				<ul id="articles-list">
					{/*{props.articles.map(a => <Article article={a} />)}*/}
					{staticArticles.map(a => <Article article={a} />)}
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