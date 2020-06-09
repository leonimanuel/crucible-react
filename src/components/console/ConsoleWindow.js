import React, { Component } from 'react';
import "./consoleWindow.css"
import { connect } from "react-redux"
import ConsoleFact from "./ConsoleFact.js"

class ConsoleWindow extends Component {
	render() {
		return (
			<div id="console-window">
				<div id="console-window-header">Fact Console</div>
				<div id="facts-container">
					{this.props.facts.map(fact => <ConsoleFact fact={fact}/>)}
				</div>
			</div>
		)
	}
}


export default connect(state => ({facts: state.facts}))(ConsoleWindow);




