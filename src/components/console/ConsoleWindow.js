import React, { Component } from 'react';
// import { connect } from "react-redux"
import ConsoleFactList from "./ConsoleFactList.js"
import ConsoleTopicList from "./ConsoleTopicsList.js"

class ConsoleWindow extends Component {
	render() {
		return (
			<div id="console-window">
				<div id="console-window-title">Fact Console</div>
				<ConsoleTopicList />
			</div>
		)
	}
}


export default ConsoleWindow;




