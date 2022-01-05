import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopicsList from "./ConsoleTopicsList.js"
import { selectTopic } from "../../actions/topicsActions.js"

class TopicMenu extends Component {
	componentDidMount() {
		// debugger
		this.props.selectTopic(this.props.newFactsTopic)
	}

	render() {
		return (
			<div id="console-topic-menu-container">
				<div id="console-topics-container">
					{this.props.topics ? <ConsoleTopicsList topics={this.props.topics} /> : null} 
				</div>
				{/*<div>collect facts with the <a href="https://chrome.google.com/webstore/detail/crucible/npbeagaahjohdgibaddadkhcffnedcnh?authuser=1" target="_blank">Crucible chrome extension</a></div>*/}
				<a href="https://chrome.google.com/webstore/detail/crucible/npbeagaahjohdgibaddadkhcffnedcnh?authuser=1" target="_blank"><button id="extension-link-button">Collect New Facts</button></a>
			</div>
		)
	}
}

const mapStateToProps = state => {
  // debugger
  return {
    topics: state.topics.topics,
    newFactsTopic: state.topics.topics.find(topic => topic.name == "New Facts")
  }
}

export default connect(mapStateToProps, { selectTopic })(TopicMenu);




