import React, { Component } from 'react';
// import { connect } from "react-redux"
import FactDetailsPane from "./FactDetailsPane.js"

class ConsoleFact extends Component {
	state = {
		showFactDetails: false
	}

	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("object", JSON.stringify({parentTopic: this.props.parentTopic, fact: this.props.fact}))
	}

	toggleFactDetailPane = () => {
		this.setState({showFactDetails: !this.state.showFactDetails})
	}
				 // <FactDetailPane />

	render() {
		return (
			<div>
				<div 
					id={`${this.props.parentTopic.name}-fact-${this.props.fact.id}`} 
					className="fact-box"
	 				draggable 
	 				onDragStart={this.startDrag}
	 				onClick={this.toggleFactDetailPane}
				>
						{this.props.fact.content}
				</div>				
			
				{this.state.showFactDetails ? <FactDetailsPane /> : null}
			</div>
		)
	}
}


export default ConsoleFact;




