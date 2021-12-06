import React, { Component } from 'react';
import parse from 'html-react-parser';

class TimelineFact extends Component {
	render() {
		const { fact } = this.props;
		
		const innerHTML = (fact.node_text) ? `<span>${fact.node_text.replace(fact.content, `<span style="font-weight: bold">${fact.content}</span>`)}</span>` : `<span>${fact.content}</span>`
		debugger
		let border
		if (fact.review_status === "pending") {
			border = "3px solid #ff9234" //yellow
		} else if (fact.review_status === "pass") {
				border = "3px solid green" 		
		} else {
				border = "3px solid red" 		
		}
		return (
			<div className="comment-fact" style={{border: border}}>
				{parse(innerHTML)}
			</div>
		)
	}
}


export default TimelineFact;




