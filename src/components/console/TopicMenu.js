import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopicsList from "./ConsoleTopicsList.js"
import { selectTopic } from "../../actions/topicsActions.js"

class TopicMenu extends Component {
	componentDidUpdate() {
		// debugger
		if (!this.props.parentTopic) { this.props.selectTopic(this.props.newFactsTopic) }
	}

	render() {
		return (
			<div id="console-topic-menu-container" style={{"max-height": this.props.display ? "200px" : 0}}>
				<div id="console-topics-container">
					{this.props.topics ? <ConsoleTopicsList topics={this.props.topics.filter(t => !t.parent_id)} /> : null} 
				</div>
				{/*<div>collect facts with the <a href="https://chrome.google.com/webstore/detail/crucible/npbeagaahjohdgibaddadkhcffnedcnh?authuser=1" target="_blank">Crucible chrome extension</a></div>*/}
			</div>
		)
	}
}

const mapStateToProps = state => {
  // debugger
  return {
    topics: state.topics.topics,
    newFactsTopic: state.topics.topics.find(topic => topic.name == "New"),
    parentTopic: state.topics.parentTopic
  }
}

export default connect(mapStateToProps, { selectTopic })(TopicMenu);




