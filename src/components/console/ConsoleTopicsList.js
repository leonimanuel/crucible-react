import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopic from "./ConsoleTopic.js"
import AddListItemButton from "../agora/AddListItemButton.js"

class ConsoleTopicsList extends Component {
	render() {
		// console.log(this.props.topics)
		return (
			<div id="console-topics-list-container">
				<div className="list-title-wrapper">
					<div className="list-title">Topics</div>
					<AddListItemButton id="add-topic-button" buttonAction={this.props.createTopic} />
				</div>
				<div id="console-topics-container">
					{this.props.topics ? this.props.topics.map(topic => <ConsoleTopic key={topic.id} topic={topic}/>) : null}
				</div>
			</div>
		)
	}
}


export default connect()(ConsoleTopicsList);




// <ConsoleTopic key={topic.id} topic={topic}/>