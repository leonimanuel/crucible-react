import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopicsList from "./ConsoleTopicsList.js"
import ConsoleFactsList from "./ConsoleFactsList.js"

class ConsoleWindow extends Component {
	render() {
		return (
			<div id="console-window">
				<div id="console-window-title">{this.props.parentTopic ? this.props.parentTopic.name : "NONE"}</div>
				<ConsoleTopicsList />
				<ConsoleFactsList />
			</div>
		)
	}
}


export default connect(state => ({parentTopic: state.parentTopic}))(ConsoleWindow);




