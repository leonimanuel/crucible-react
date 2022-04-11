import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopic from "./ConsoleTopic.js"
import NewTopicPopup from "./NewTopicPopup.js"
import AddListItemButton from "../agora/AddListItemButton.js"
import { createPopper } from "@popperjs/core"

class ConsoleTopicsList extends Component {
	state = {
		renderNewTopicPopup: false
	}

	handleNewTopic = () => {
		this.setState({
			renderNewTopicPopup: true
		}, () => {
			let button = document.querySelector("#add-topic-button");
			let popup = document.querySelector("#new-topic-popup")
			createPopper(button, popup, {
			  placement: 'right',
			});			
		})
	}

	closePopup = () => {
		this.setState({...this.state, renderNewTopicPopup: false})
	}

	render() {
		return (
			<div id="console-topics-list-container">
				<div className="list-title-wrapper">
					<div className="list-title">Topics</div>
					<AddListItemButton id="add-topic-button" buttonAction={this.handleNewTopic} fill="black" />
				</div>
				<div id="console-topics-container">
					{this.props.topics ? this.props.topics.map(topic => <ConsoleTopic key={topic.id} topic={topic}/>) : null}
				</div>
			
				{this.state.renderNewTopicPopup 
					? <NewTopicPopup 
							parentId={this.props.parentId ? this.props.parentId : null} 
							closePopup={this.closePopup} /> 
					: null
				}
			</div>
		)
	}
}


export default connect()(ConsoleTopicsList);

