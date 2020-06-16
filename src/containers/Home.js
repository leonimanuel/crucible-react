import chunk from 'lodash/chunk';
import _ from 'lodash';

import React, { Component } from 'react';


class Home extends Component {
	handleMouseUp = e => {
		// debugger
	}

	render() {
		return (
			<div onMouseUp={this.handleMouseUp} id="home-wrapper">
				<h1>This is the home page. isn't it nice?</h1>
			</div>
		)
	}
}


export default Home;