import React, { Component } from 'react';
import "./home.css"

import DiscussionsOverview from "../components/home/DiscussionsOverview.js"
import ReviewsOverview from "../components/home/ReviewsOverview.js"
import BriefingsOverview from "../components/home/BriefingsOverview.js"
import ScoresOverview from "../components/home/ScoresOverview.js"
import LandingPage from "../components/home/LandingPage.js"

class Home extends Component {
	render() {
		let app = document.querySelector(".App")
		app.style.backgroundColor = "whitesmoke"
		return (
			<div id="home-wrapper">
				<DiscussionsOverview />
				<ReviewsOverview />
				<BriefingsOverview />
				<ScoresOverview />
			</div>

		)
	}
}


export default Home;