import React, { Component } from 'react';
// import { connect } from "react-redux"
import ConsoleTopicsList from "./ConsoleTopicsList.js"

class ConsoleWindow extends Component {
	render() {
		return (
			<div id="console-window">
				<div id="console-window-title">Fact Console</div>
				<ConsoleTopicsList />
			</div>
		)
	}
}


export default ConsoleWindow;




