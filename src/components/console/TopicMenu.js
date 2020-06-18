import React, { Component } from 'react';
import { connect } from "react-redux"
import { fetchTopics } from "../../actions/topicsActions.js" 

// import ConsoleTopic from "./ConsoleTopic.js"
import ConsoleTopicsList from "./ConsoleTopicsList.js"

class TopicMenu extends Component {
	componentDidMount() {
		debugger
		this.props.fetchTopics()
	}

	render() {
		// console.log(!!this.props.topics)
		debugger
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


export default connect(state => ({topics: state.topics.topics}), { fetchTopics })(TopicMenu);




