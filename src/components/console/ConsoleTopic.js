import React, { Component } from 'react';
import { connect } from "react-redux"
import { selectTopic } from "../../actions/users.js"

class ConsoleTopic extends Component {
	handleTopicSelection = () => {
		this.props.selectTopic(this.props.topic)
	}

	render() {
		return (
			<div onClick={this.handleTopicSelection} className="topic-box">{this.props.topic.name}</div>
		)
	}
}


export default connect(null, { selectTopic })(ConsoleTopic);




