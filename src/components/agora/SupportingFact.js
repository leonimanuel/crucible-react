import React, { Component } from 'react';

class SupportingFact extends Component {
	render() {
		const { fact } = this.props;
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
				{fact.content}
			</div>
		)
	}
}


export default SupportingFact;




