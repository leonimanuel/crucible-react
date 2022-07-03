import React, { Component } from 'react';
import { connect } from "react-redux"
import ConsoleTopic from "./ConsoleTopic.js"
import NewTopicPopup from "./NewTopicPopup.js"
import AddListItemButton from "../agora/AddListItemButton.js"
import { createPopper } from "@popperjs/core"

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

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
					{/*<AddListItemButton id="add-topic-button" buttonAction={this.handleNewTopic} fill="black" />*/}

				  <Popup 
				  	trigger={
							<div id="new-topic-modal-button" className="plus-button-box">
								<svg className="plus-button-svg" height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg" style={{fill: "black"}}><path className="plus-button-path" d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm112 277.332031h-90.667969v90.667969c0 11.777344-9.554687 21.332031-21.332031 21.332031s-21.332031-9.554687-21.332031-21.332031v-90.667969h-90.667969c-11.777344 0-21.332031-9.554687-21.332031-21.332031s9.554687-21.332031 21.332031-21.332031h90.667969v-90.667969c0-11.777344 9.554687-21.332031 21.332031-21.332031s21.332031 9.554687 21.332031 21.332031v90.667969h90.667969c11.777344 0 21.332031 9.554687 21.332031 21.332031s-9.554687 21.332031-21.332031 21.332031zm0 0"/></svg>			
							</div>
				  	} 
				  	position="center" 
				  	modal
			  	>
			    	{ close => <NewTopicPopup 
			    			closePopup={() => close()}
			    			parentId={this.props.parentId ? this.props.parentId : null} 
			    		/> 
			    	}
				  </Popup>

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

