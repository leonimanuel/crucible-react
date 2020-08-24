import React, { Component } from 'react';
import { connect } from "react-redux"
import { submitRephrase } from "../../actions/factsActions"

import ScoreBar from "./ScoreBar.js"

class FactDetailsPane extends Component {
	openFactSource = (url) => {
		window.open(url,'_blank');
	}

	render() {
		const { fact } = this.props
		return (
			<div className="fact-details-pane" id={this.props.id}>
				<div id="fact-detail-buttons-container">
					{fact.rephrase ? <button className="fact-detail-button" onClick={this.props.handleContentToggle}>{this.props.factText}</button> : null}
					<button className="fact-detail-button" onClick={this.props.onCopy}>copy</button>
					<button className="fact-detail-button" onClick={() => this.openFactSource(fact.url)}>source</button>
				</div>
				<div className="fact-score">
					<div className="fact-score-title">Logic:</div>
					<ScoreBar greenScore={fact.logic_upvotes} redScore={fact.logic_downvotes} type="individual" />
				</div>

				<div className="fact-score">
					<div className="fact-score-title">Context:</div>
					<ScoreBar greenScore={fact.context_upvotes} redScore={fact.context_downvotes} type="individual" />
				</div>

				<div className="fact-score">
					<div className="fact-score-title">Credibility:</div>
					<ScoreBar greenScore={fact.credibility_upvotes} redScore={fact.credibility_downvotes} type="individual" />
				</div>
			</div>
		)
	}
}


export default connect(null, { submitRephrase })(FactDetailsPane);




