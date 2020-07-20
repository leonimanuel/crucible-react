import React, { Component } from 'react';
import { connect } from "react-redux"
import { selectTopic, moveFact } from "../../actions/topicsActions.js"
import { API_ROOT } from "../../constants"
// import { showDetailPane } from "../../actions/sidenavActions.js"


class ConsoleTopic extends Component {
	state = {
		draggedOver: false
	}

	handleTopicSelection = () => {
		console.log("handling topic selection")
		this.props.selectTopic(this.props.topic)
		// this.props.showDetailPane()
	}

	allowDrop = e => {
		e.preventDefault();
	}

	handleDragEnter = e => {
		this.setState({ draggedOver: true })
	}

	handleDragLeave = e => {
		this.setState({ draggedOver: false })
	}

	drop = e => {
		e.preventDefault();
		console.log(JSON.parse(e.dataTransfer.getData("object")))
		let transferObj = JSON.parse(e.dataTransfer.getData("object"))
		// let originTopicName = e.dataTransfer.getData("text").split("-")[0]
		// let factId = parseInt(e.dataTransfer.getData("text").split("-").pop());
		let originTopic = transferObj.parentTopic
		let fact = transferObj.fact

		this.setState({draggedOver: false})
		this.props.moveFact(fact.id, originTopic.name, this.props.topic.name)
	}

	render() {
		console.log(this.props.topic)
		// console.log(this.props.parentTopic)
		return (
			<div onClick={this.handleTopicSelection} 
				onDragOver={this.allowDrop} onDragEnter={this.handleDragEnter}
				onDragLeave={this.handleDragLeave}
				onDrop={this.drop}
				className={`topic-box ${this.state.draggedOver ? "dragged-over" : "" }`}
			>
				{this.props.topic.name}
			</div>
		)
	}
}


export default connect(null, { selectTopic, moveFact})(ConsoleTopic);




