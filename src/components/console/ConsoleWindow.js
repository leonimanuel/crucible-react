import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopicsList from "./ConsoleTopicsList.js"
import ConsoleFactsList from "./ConsoleFactsList.js"

class ConsoleWindow extends Component {
	render() {
		console.log(this.props.parentTopic)
		return (
			<div id="console-window">
				<div id="console-window-title">{this.props.parentTopic ? this.props.parentTopic.name : "NONE"}</div>
				<ConsoleTopicsList topics={this.props.parentTopic.children} />
				<ConsoleFactsList parentTopic={this.props.parentTopic} />
			</div>
		)
	}
}


export default connect()(ConsoleWindow);




