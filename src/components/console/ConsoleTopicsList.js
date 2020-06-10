import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopic from "./ConsoleTopic.js"


class ConsoleTopicsList extends Component {
	render() {
		console.log(this.props.parentTopic)
		return (
			<div id="console-topics-list-container">
				<div className="console-topics-title console-section-title">Topic</div>
				<div id="console-topics-container">
					{this.props.parentTopic ? this.props.parentTopic.children.map(topic => <ConsoleTopic key={topic.id} topic={topic}/>) : null}
				</div>
			</div>
		)
	}
}


export default connect(state => ({ parentTopic: state.parentTopic }))(ConsoleTopicsList);




