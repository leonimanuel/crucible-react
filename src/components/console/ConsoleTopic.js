import React, { Component } from 'react';
import { connect } from "react-redux"
import { selectTopic, updateTopic, addTopics } from "../../actions/users.js"
import rootURL from "../../rootURL.js"


class ConsoleTopic extends Component {
	state = {
		draggedOver: false
	}

	handleTopicSelection = () => {
		console.log("handling topic selection")
		this.props.selectTopic(this.props.topic)
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
		let originTopicName = e.dataTransfer.getData("text").split("-")[0]
		let factId = parseInt(e.dataTransfer.getData("text").split("-").pop());
		this.setState({draggedOver: false})
		this.moveFact(originTopicName, factId)
	}

	moveFact = (originTopicName, factId) => {
		// SET UP NESTED ROUTES IN SERVER?
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }, 
      body: JSON.stringify({
      	fact_id: factId,
      	origin_topic_name: originTopicName,
      	destination_topic_name: this.props.topic.name
      })
    }

    fetch(rootURL() + `/facts`, configObj)
      .then(resp => resp.json())
      .then((topicsData) => {
				console.log(this.props.topic)
				console.log(this.props.topic.facts.find(fact => fact.id === factId))
				this.props.addTopics(topicsData)
				console.log(this.props.topic.facts.find(fact => fact.id === factId))
				this.props.updateTopic(this.props.topic.facts.find(fact => fact.id === factId))
     })
      .catch(err => err.message)
	}

	render() {
		console.log(this.props.topic)
		console.log(this.props.parentTopic)
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


export default connect(state => ({parentTopic: state.parentTopic}), { selectTopic, updateTopic, addTopics })(ConsoleTopic);




