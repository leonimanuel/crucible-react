import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleFact from "./ConsoleFact.js"

class ConsoleFactsList extends Component {
	render() {
		return (
			<div id="console-fact-list-container">
				<div className="console-facts-title console-section-title">Facts</div>
				<div id="console-facts-container">
					{this.props.facts ? this.props.facts.map(fact => <ConsoleFact key={fact.id} parentTopic={this.props.parentTopic} fact={fact}/>) : null}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		parentTopic: state.topics.parentTopic,
		facts: state.topics.facts.filter(fact => fact.topic_id === state.topics.parentTopic.id)
	}
}

export default connect(mapStateToProps)(ConsoleFactsList);




