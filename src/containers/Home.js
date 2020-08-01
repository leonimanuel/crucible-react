import React, { Component } from 'react';
import "./home.css"

import DiscussionsOverview from "../components/home/DiscussionsOverview.js"
import ReviewsOverview from "../components/home/ReviewsOverview.js"
import BriefingsOverview from "../components/home/BriefingsOverview.js"
import ScoresOverview from "../components/home/ScoresOverview.js"

class Home extends Component {
	handleMouseUp = e => {
		// debugger
	}

	render() {
		return (
			<div onMouseUp={this.handleMouseUp} id="home-wrapper">
				<DiscussionsOverview />
				<ReviewsOverview />
				<BriefingsOverview />
				<ScoresOverview />
			</div>
		)
	}
}


export default Home;