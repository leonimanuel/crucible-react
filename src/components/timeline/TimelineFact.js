import React, { Component } from 'react';
import parse from 'html-react-parser';
import { connect } from "react-redux"
import { addFactFromComment } from "../../actions/discussionsActions.js"

import TimelineItemHeader from "./TimelineItemHeader.js"

class TimelineFact extends Component {
	handleAddFact = (fact) => {
		console.log("executing handleAddFact")
		// debugger
		this.props.addFactFromComment(fact, fact.collector_id);
	}	

	render() {
		const { fact } = this.props;
		
		const innerHTML = (fact.node_text) ? `<span>${fact.node_text.replace(fact.content, `<span style="font-weight: bold">${fact.content}</span>`)}</span>` : `<span>${fact.content}</span>`
		let border
		// if (fact.review_status === "pending") {
		// 	border = "3px solid #ff9234" //yellow
		// } else if (fact.review_status === "pass") {
		// 		border = "3px solid green" 		
		// } else {
		// 		border = "3px solid red" 		
		// }
		return (
			<div className="timeline-fact timeline-item">
				{this.props.userId !== fact.user_id && !this.props.userFacts.find(f => f.id === fact.id)
					? 
						<button 
							className="add-comment-fact-button" 
							onClick={() => this.handleAddFact(fact)}
						>+</button>
					: 
						null
				}

				<div className="timeline-fact timeline-item" style={{border: border}}>
					{/*parse(innerHTML)*/}
					{fact.content}
				</div>
			</div>			
		)
	}
}

const mapStateToProps = state => {
	return {
		userId: state.users.userId,
		userFacts: state.topics.facts 
	}
}

export default connect(mapStateToProps, { addFactFromComment })(TimelineFact);
