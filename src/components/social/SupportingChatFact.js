import React, { Component } from 'react';

// This component is specifically for facts in the Chat Drop Zone
class SupportingChatFact extends Component {
	state = {
		factPosition: ""
	}

	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("object", JSON.stringify({fact: this.props.fact, origin: "dropzone"}))
		this.setState({factPosition: this.props.facts.indexOf(this.props.fact)})
		
		// e.persist()
		// setTimeout(() => {
		// 	e.target.style.visibility = "hidden"
		// }, 500)
		// setTimeout(() => this.props.handleDrag(this.props.facts.filter(f => f.id != this.props.fact.id)), 200)
		
	}

	endDrag = (e) => {
		// this.props.handleDrag(this.props.facts.splice((this.state.factPosition - 1), 0, this.props.fact))
		// alert("I just got dropped")
		// e.target.style.height = "50px"
		// e.target.style.display = "block"
	}
	render() {
		const { fact } = this.props;
		let border
		// if (fact.review_status === "pending") {
		// 	border = "3px solid #ff9234" //yellow
		// } else if (fact.review_status === "pass") {
		// 		border = "3px solid green" 		
		// } else {
		// 		border = "3px solid red" 		
		// }
		return (
			<div 
				className="chat-fact" 
				style={{border: border}}
 				draggable 
 				onDragStart={this.startDrag}			
 				onDragEnd={this.endDrag}
			>
					{fact.content}
				<div className="remove-fact-button" onClick={() => this.props.sendRemoval(fact.id)}>✕ {fact.id}</div>
			</div>
		)
	}
}


export default SupportingChatFact;




