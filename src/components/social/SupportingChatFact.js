import React, { Component } from 'react';

// This component is specifically for facts in the Chat Drop Zone
class SupportingChatFact extends Component {
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
			<div className="chat-fact" style={{border: border}}>
				{fact.content}
				<div className="remove-fact-button" onClick={() => this.props.sendRemoval(fact.id)}>✕</div>
			</div>
		)
	}
}


export default SupportingChatFact;




