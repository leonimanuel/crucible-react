import React, { Component } from 'react';
import { connect } from "react-redux"
import { submitRephrase } from "../../actions/factsActions"

import ScoreBar from "./ScoreBar.js"

class FactDetailsPane extends Component {
	state = {
		showRephraseForm: false,
		text: ""
	}

  handleChange = e => {
    e.persist()
    this.setState({ text: e.target.innerText }, () => {
      if (e.key == "Enter") { 
        this.handleSubmit() 
      }
    });
  }

  handleSubmit = () => {
    // e.preventDefault();
    this.props.submitRephrase(this.state.text)
    
    this.setState({ text: '' });
    let rephraseInput = document.getElementById("rephrase-input-div")
    rephraseInput.innerHTML = ""
  }

	render() {
		const { fact } = this.props
		return (
			<div className="fact-details-pane">
				<div>
					{
						fact.rephrase 
							? `Original fact: ${fact.content}` 
							: <button onClick="handleAddRephrase">Rephrase Fact</button>
					}
					
          {this.state.showRephraseForm ? <div id="rephrase-input-div" contentEditable="true" onKeyPress={this.handleChange}></div> : null} 
				</div>

				

				<div>Logic upvotes: {fact.logic_upvotes}</div>
				<div>Logic downvotes: {fact.logic_downvotes}</div>

				<div className="fact-score">
					<div>Logic:</div>
					<ScoreBar greenScore={fact.logic_upvotes} redScore={fact.logic_downvotes} />
				</div>

				<div>Context upvotes: {fact.context_upvotes}</div>
				<div>Context downvotes: {fact.context_downvotes}</div>
				<div>Credibility upvotes: {fact.credibility_upvotes}</div>
				<div>Credibility downvotes: {fact.credibility_downvotes}</div>
			</div>
		)
	}
}


export default connect(null, { submitRephrase })(FactDetailsPane);




