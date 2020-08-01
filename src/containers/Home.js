import React, { Component } from 'react';
import "./home.css"

import DiscussionsOverview from "../components/home/DiscussionsOverview.js"
import ReviewsOverview from "../components/home/ReviewsOverview.js"
import BriefingsOverview from "../components/home/BriefingsOverview.js"

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
			</div>
		)
	}
}


export default Home;