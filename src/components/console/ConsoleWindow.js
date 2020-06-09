import React, { Component } from 'react';
import "./consoleWindow.css"
import { connect } from "react-redux"

class ConsoleWindow extends Component {
	render() {
		return (
			<div id="console-window">
				<div id="console-window-header">Fact Console</div>
			</div>
		)
	}
}


export default connect()(ConsoleWindow);




