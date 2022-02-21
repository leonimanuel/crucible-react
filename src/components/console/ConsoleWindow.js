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
					{this.props.parentTopic.name === "New Facts" ? null 
						: <ConsoleTopicsList 
						topics={this.props.topics.filter(topic => topic.parent_id == this.props.parentTopic.id)} 
						parentId={this.props.parentTopic.id}/>
					}
					<ConsoleFactsList  />
			</div>
		)			
	}
}

const mapStateToProps = state => {
	return {
		topics: state.topics.topics,
		parentTopic: state.topics.parentTopic
	}
}

export default connect(mapStateToProps)(ConsoleWindow);




