import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleFact from "./ConsoleFact.js"

class ConsoleFactsList extends Component {
	render() {
		// console.log("render")
		return (
			<div id="console-fact-list-container">
				<div className="console-facts-title console-section-title">Facts</div>
				<div id="console-facts-container">
					{this.props.parentTopic.facts ? this.props.parentTopic.facts.map(fact => <ConsoleFact key={fact.id} fact={fact}/>) : null}
				</div>
			</div>
		)
	}
}


export default connect(state => ({parentTopic: state.parentTopic}))(ConsoleFactsList);




