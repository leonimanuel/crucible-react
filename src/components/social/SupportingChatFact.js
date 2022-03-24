import React, { Component } from 'react';

// This component is specifically for facts in the Chat Drop Zone
class SupportingChatFact extends Component {
	state = {
		factPosition: "",
		showOriginalFact: false
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

	toggleFactRephrase = () => this.setState({showOriginalFact: !this.state.showOriginalFact})

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
				<div className="original-vs-rephrase-indicator" onClick={this.toggleFactRephrase}>
					show {this.state.showOriginalFact ? "rephrase" : "original"}
				</div>

				<div className="timeline-fact-content" style={{border: border}}>
					{/*parse(innerHTML)*/}
					{/*fact.content*/}
					{fact.rephrase ? (this.state.showOriginalFact ? fact.content : fact.rephrase.content) : fact.content}
				</div>

				<div className="remove-fact-button" onClick={() => this.props.sendRemoval(fact.id)}>✕</div>
			</div>
		)
	}
}


export default SupportingChatFact;




