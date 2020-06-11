import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopic from "./ConsoleTopic.js"


class ConsoleTopicsList extends Component {
	render() {
		// console.log(this.props.topics)
		return (
			<div id="console-topics-list-container">
				<div className="console-topics-title console-section-title">Topics</div>
				<div id="console-topics-container">
					{this.props.topics ? this.props.topics.map(topic => <ConsoleTopic key={topic.id} topic={topic}/>) : null}
				</div>
			</div>
		)
	}
}


export default connect()(ConsoleTopicsList);




// <ConsoleTopic key={topic.id} topic={topic}/>