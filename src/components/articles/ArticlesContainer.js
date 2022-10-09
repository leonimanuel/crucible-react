import React from 'react';
import { connect } from "react-redux"
import { BrowserRouter as Router, Route} from "react-router-dom";
import "./articles.scss"

import Article from "./Article.js"
import GroupCard from "../groups/GroupCard.js"

const ArticlesContainer = (props) => {
	const staticArticles = [
		{
			url: "https://theintercept.com/2022/09/28/cia-extinction-woolly-mammoth-dna/",
			title: "The CIA Just Invested in Woolly Mammoth Resurrection Technology"
		},
		{
			url: "https://www.bloomberg.com/opinion/articles/2022-09-13/niall-ferguson-ukraine-s-army-is-winning-but-its-economy-is-losing",
			title: "Ukraine’s Army Is Winning But Its Economy Is Losing"	
		},
		{
			url: "https://www.wsj.com/articles/iran-protests-are-proving-a-durable-challenge-to-the-islamic-republic-11665319812",
			title: "Iran Protests Are Proving a Durable Challenge to the Islamic Republic"
		},
		{
			url: "https://www.politico.com/news/2022/10/09/senate-swing-state-polls-2022-00060983",
			title: "Battle for Senate majority remains a nail-biter"
		},
		{
			url: "https://www.wired.com/story/the-election-swinging-facebook-fueled-get-out-the-vote-machine/",
			title: "The Election-Swinging, Facebook-Fueled, Get-Out-the-Vote Machine"
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