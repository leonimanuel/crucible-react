import React, { Component } from 'react';
import { connect } from "react-redux"
import { selectTopic } from "../../actions/users.js"
import rootURL from "../../rootURL.js"


class ConsoleTopic extends Component {
	state = {
		draggedOver: false
	}

	handleTopicSelection = () => {
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
		let id = e.dataTransfer.getData("text").split("-").pop();
		console.log(id)
		this.setState({draggedOver: false})
		this.moveFact(id)
	}

	moveFact = (factId) => {
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
      	origin_topic_name: this.props.parentTopic.name,
      	destination_topic_name: this.props.topic.name
      })
    }

    // console.log("OY")
    fetch(rootURL() + `/facts`, configObj)
      .then(resp => resp.json())
      .then((data) => {
				console.log(data)
				this.props.addTopics(data)
      })
      .catch(err => err.message)
		console.log(factId)
	}

	render() {
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


export default connect(state => ({parentTopic: state.parentTopic}), { selectTopic })(ConsoleTopic);




