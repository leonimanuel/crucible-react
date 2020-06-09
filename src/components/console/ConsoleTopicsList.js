import React, { Component } from 'react';
import { connect } from "react-redux"
// import ConsoleTopic from "./ConsoleTopic.js"

class ConsoleTopicList extends Component {
	render() {
		console.log(this.props.topics)
		return (
			<div id="console-topic-list-container">
				<div className="console-topics-title console-section-title">Topic</div>
				<div id="console-topics-container">
					{/*this.props.facts.map(fact => <ConsoleTopic key={topic.id} topic={topic}/>)*/}
				</div>
			</div>
		)
	}
}


export default connect(state => ({topics: state.topics}))(ConsoleTopicList);




