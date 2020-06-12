import React, { Component } from 'react';
import { connect } from "react-redux"
// import ConsoleTopic from "./ConsoleTopic.js"
import ConsoleTopicsList from "./ConsoleTopicsList.js"

class TopicMenu extends Component {
	render() {
		// console.log(!!this.props.topics)
		return (
			<div id="console-topic-menu-container">
				<div className="console-topics-title console-section-title">Topics</div>
				<div id="console-topics-container">
					{this.props.topics ? <ConsoleTopicsList topics={this.props.topics}/> : null} 
				</div>
			</div>
		)
	}
}


export default connect()(TopicMenu);




