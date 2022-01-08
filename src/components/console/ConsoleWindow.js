import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopicsList from "./ConsoleTopicsList.js"
import ConsoleFactsList from "./ConsoleFactsList.js"

class ConsoleWindow extends Component {
	componentWillUnmount() {
		// debugger
	}

	render() {
		console.log("rendering console window")
		return (
			<div id="console-window">
				<div id="console-window-title">{this.props.parentTopic ? this.props.parentTopic.name : "NONE"}</div>
					{this.props.parentTopic.name === "New Facts" ? null : <ConsoleTopicsList topics={this.props.parentTopic.children} parentId={this.props.parentTopic.id}/>}
					<ConsoleFactsList  />
			</div>
		)			
	}
}


export default connect(state => ({parentTopic: state.topics.parentTopic}))(ConsoleWindow);




