import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleFact from "./ConsoleFact.js"

class ConsoleFactsList extends Component {
	render() {
		return (
			<div id="console-fact-list-container">
				<div className="console-facts-title console-section-title">Facts</div>
				<div id="console-facts-container">
					{this.props.facts.length ? 
						this.props.facts.map(fact => <ConsoleFact key={fact.id} parentTopic={this.props.parentTopic} fact={fact}/>) 
						: 
						<React.Fragment>
							<div id="facts-prompt" className="sidenav-onboarding-prompt">facts added to Crucible, either through the extension or in-app, will appear here.</div>
							<br />
							<div id="topics-prompt" className="sidenav-onboarding-prompt">Create new topic folders with the "<b>+</b>" button in the top-left. Then, simply drag your facts into the desired folder.</div>
							<a href="https://chrome.google.com/webstore/detail/crucible/npbeagaahjohdgibaddadkhcffnedcnh?authuser=1" target="_blank"><button id="extension-link-button">Collect New Facts</button></a>							
						</React.Fragment>
					}
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		parentTopic: state.topics.parentTopic,
		facts: state.topics.facts.filter(fact => fact.topic_id === state.topics.parentTopic.id).sort((a, b) => new Date(b.collected_at) - new Date(a.collected_at))
	}
}

export default connect(mapStateToProps)(ConsoleFactsList);




