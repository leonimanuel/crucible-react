import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleFact from "./ConsoleFact.js"

class ConsoleFactList extends Component {
	render() {
		return (
			<div id="console-fact-list-container">
				<div className="console-facts-title console-section-title">Facts</div>
				<div id="console-facts-container">
					{this.props.facts.map(fact => <ConsoleFact key={fact.id} fact={fact}/>)}
				</div>
			</div>
		)
	}
}


export default connect(state => ({facts: state.facts}))(ConsoleFactList);




