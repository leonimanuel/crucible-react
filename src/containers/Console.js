import React, { Component } from 'react';
import "../components/console/console.css"

import rootURL from "../rootURL.js"
import { connect } from "react-redux"
import ConsoleWindow from "../components/console/ConsoleWindow.js"

class Console extends Component {
	render() {
		// this.fetchFacts()
		return (
			<div id="console-container">
				<ConsoleWindow />
			</div>
		)
	}
}

export default connect()(Console);




