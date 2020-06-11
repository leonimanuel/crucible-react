import React, { Component } from 'react';
// import { connect } from "react-redux"

class ConsoleFact extends Component {
	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("text", e.target.id)
		// console.log(data)
	}

	render() {
		return (
			<div id={`fact-${this.props.fact.id}`} className="fact-box"
 				draggable onDragStart={this.startDrag}>
				{this.props.fact.content}
			</div>
		)
	}
}


export default ConsoleFact;




