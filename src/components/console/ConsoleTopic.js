import React, { Component } from 'react';
import { connect } from "react-redux"
import { selectTopic } from "../../actions/users.js"

class ConsoleTopic extends Component {
	state = {
		draggedOver: false
	}

	handleTopicSelection = () => {
		this.props.selectTopic(this.props.topic)
	}

	allowDrop = e => {
		e.preventDefault();
		console.log("allowing drag-over")
		// e.target.style.back
	}

	handleDragEnter = e => {
		// e.preventDefault();
		this.setState({
			draggedOver: true
		})
		// console.log(e.target.class)
		// e.target.class.add("blue")
	}

	handleDragLeave = e => {
		// e.preventDefault();
		// e.target.style.backgroundColor = "none"
		this.setState({
			draggedOver: false
		})
		console.log("aight peace")
	}

	render() {
		return (
			<div onClick={this.handleTopicSelection} 
				onDragOver={this.allowDrop} onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave} 
				className={`topic-box ${this.state.draggedOver ? "dragged-over" : "" }`}
			>
				{this.props.topic.name}
			</div>
		)
	}
}


export default connect(null, { selectTopic })(ConsoleTopic);




