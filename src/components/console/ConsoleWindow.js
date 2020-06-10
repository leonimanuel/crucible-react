import React, { Component } from 'react';
// import { connect } from "react-redux"
import ConsoleTopicsList from "./ConsoleTopicsList.js"
import ConsoleFactsList from "./ConsoleFactsList.js"

class ConsoleWindow extends Component {
	render() {
		return (
			<div id="console-window">
				<div id="console-window-title">Fact Console</div>
				<ConsoleTopicsList />
				<ConsoleFactsList />
			</div>
		)
	}
}


export default ConsoleWindow;




