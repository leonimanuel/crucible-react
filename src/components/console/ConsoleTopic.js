import React, { Component } from 'react';
import { connect } from "react-redux"
import { selectTopic, updateTopic } from "../../actions/topicsActions.js"
import rootURL from "../../rootURL.js"
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
		this.moveFact(originTopic, fact)
	}

	moveFact = (originTopic, fact) => {
		// SET UP NESTED ROUTES IN SERVER?
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }, 
      body: JSON.stringify({
      	fact_id: fact.id,
      	origin_topic_name: originTopic.name,
      	destination_topic_name: this.props.topic.name
      })
    }

    fetch(rootURL() + `/facts`, configObj)
      .then(resp => resp.json())
      .then((topicsData) => {
				// console.log(this.props.topic)
				// console.log(this.props.topic.facts.find(fact => fact.id === fact.id))
				// this.props.addTopics(topicsData)
				// console.log(this.props.topic.facts.find(fact => fact.id === fact.id))
				this.props.updateTopic(fact, this.props.topic)
     })
      .catch(err => err.message)
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


export default connect(null, { selectTopic, updateTopic})(ConsoleTopic);




