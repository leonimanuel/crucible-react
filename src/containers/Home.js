// import chunk from 'lodash/chunk';
// import _ from 'lodash';

import React, { Component } from 'react';


class Home extends Component {
	handleMouseUp = e => {
		// debugger
	}

	render() {
		return (
			<div onMouseUp={this.handleMouseUp} id="home-wrapper">
				<h1>Welcome to Crucible</h1>
				<h4>Crucible is a place for organized conversations about the day's headlines where facts come first. To get started, create a new group in the Agora section of the side-panel</h4>
			</div>
		)
	}
}


export default Home;