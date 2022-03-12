import React, { Component } from 'react';

// This component is specifically for facts in the Chat Drop Zone
class SupportingChatFact extends Component {
	startDrag = e => {
		console.log("dragging")
		e.dataTransfer.setData("object", JSON.stringify({fact: this.props.fact, origin: "dropzone"}))
	}

	endDrag = () => {
		alert("I just got dropped")
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
				<div className="remove-fact-button" onClick={() => this.props.sendRemoval(fact.id)}>✕</div>
			</div>
		)
	}
}


export default SupportingChatFact;




