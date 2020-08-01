import React, { Component } from 'react';

import DiscussionsOverview from "../components/home/DiscussionsOverview.js"

class Home extends Component {
	handleMouseUp = e => {
		// debugger
	}

	render() {
		return (
			<div onMouseUp={this.handleMouseUp} id="home-wrapper">
				<DiscussionsOverview />
			</div>
		)
	}
}


export default Home;