import React, { Component } from 'react';
import { connect } from "react-redux"
import { submitRephrase } from "../../actions/factsActions"

import ScoreBar from "./ScoreBar.js"

class FactDetailsPane extends Component {
	state = {
		showRephraseForm: false,
		text: ""
	}

	handleAddRephrase = () => {
		this.setState({showRephraseForm: !this.state.showRephraseForm})
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
    debugger
    this.props.submitRephrase(this.state.text, this.props.fact.id)
    this.setState({ text: '' });
    let rephraseInput = document.getElementById("rephrase-input-form")
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
							: <button onClick={this.handleAddRephrase}>Rephrase Fact</button>
					}
					
          {this.state.showRephraseForm 
          	? 
							<div>
	          		<div id="rephrase-input-form" contentEditable="true" onKeyPress={this.handleChange}></div> 							
								<button onClick={this.handleSubmit}>submit rephrase</button>
							</div>
          	: null
          } 
				</div>

				<div className="fact-score">
					<div className="fact-score-title">Logic:</div>
					<ScoreBar greenScore={fact.logic_upvotes} redScore={fact.logic_downvotes} />
				</div>

				<div className="fact-score">
					<div className="fact-score-title">Context:</div>
					<ScoreBar greenScore={fact.context_upvotes} redScore={fact.context_downvotes} />
				</div>

				<div className="fact-score">
					<div className="fact-score-title">Credibility:</div>
					<ScoreBar greenScore={fact.credibility_upvotes} redScore={fact.credibility_downvotes} />
				</div>
			</div>
		)
	}
}


export default connect(null, { submitRephrase })(FactDetailsPane);




