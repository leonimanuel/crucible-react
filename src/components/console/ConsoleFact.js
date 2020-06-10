import React, { Component } from 'react';
// import { connect } from "react-redux"

class ConsoleFact extends Component {
	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("drag-item", this.props.dataItem)
	}

	render() {
		return (
			<div className="fact-box"
 				draggable onDragStart={this.startDrag}>
				{this.props.fact.content}
			</div>
		)
	}
}


export default ConsoleFact;




