import React, { Component } from 'react';
// import { connect } from "react-redux"
import ConsoleFactList from "./ConsoleFactList.js"

class ConsoleWindow extends Component {
	render() {
		return (
			<div id="console-window">
				<div id="console-window-title">Fact Console</div>
				<ConsoleFactList />
			</div>
		)
	}
}


export default ConsoleWindow;




