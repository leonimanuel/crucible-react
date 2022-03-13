import React, { Component } from 'react';

import SupportingChatFact from "../social/SupportingChatFact.js"

class FactDropzone extends Component {
  allowDrop = e => {
    e.preventDefault();
    e.target.dataset.dragged_over = "true"
  }

  handleDragEnter = e => {
    e.persist();
    e.target.dataset.dragged_over = "true"
  }

  handleDragLeave = e => {
    e.persist();
    e.target.dataset.dragged_over = "false"
  }

  drop = e => {
    e.preventDefault();
    e.target.dataset.dragged_over = "false"
    // console.log(JSON.parse(e.dataTransfer.getData("object")))
    let transferObj = JSON.parse(e.dataTransfer.getData("object"))
    debugger
    if (transferObj.origin == "factbank") {
      if (this.props.facts.find(fact => fact.id == transferObj.fact.id)) {        
        return alert("you've already added this fact.")
      } else if (this.props.facts.length >= 5) {
      	return alert("maximum number of supporting facts added")
      } 
      // else {
      //   // this.setState({ facts: [...this.state.facts, transferObj.fact] })
      //   this.props.handleFactsUpdate([...this.props.facts, transferObj.fact])
      // }
    } 
    // else if (transferObj.origin == "dropzone" || transferObj.origin == "factbank") {      
      e.persist()
      
      let precedingFactId = e.target.dataset.preceding_fact_id
      let draggedFact = transferObj.fact
      let filteredFacts = this.props.facts.filter(f => f.id != draggedFact.id)
      
      if (precedingFactId == "first") {
        // this.setState({facts: [draggedFact, ...filteredFacts]})        
        this.props.handleFactsUpdate([draggedFact, ...filteredFacts])
      } else {
        let precedingFactIndex = filteredFacts.indexOf(this.props.facts.find(f => f.id == precedingFactId))
        filteredFacts.splice(precedingFactIndex + 1, 0, draggedFact)
        
        // this.setState({facts: filteredFacts})
        this.props.handleFactsUpdate(filteredFacts)
      }
    // }
  }	

  handleRemoveFact = (factId) => { //removes fact from new chat fact array
    // this.setState({facts: this.state.facts.filter(fact => fact.id != factId)})
    this.props.handleFactsUpdate(this.props.facts.filter(fact => fact.id != factId))
  }

	render() {
		return (
      <div 
        id="chat-fact-dropzone" 
        // FOR THE LOVE OF CHRIST MAKE SURE TO DELETE IF YOU'RE NOT USING. COMMENTED OUT. ERROR. EMERGENCY. FUCK. NO COMMENTS IN JSX
        // className={this.state.draggedOver ? "dragged-over" : "" }
        // onDragOver={this.allowDrop} 
        // onDragEnter={this.handleDragEnter}
        // onDragLeave={this.handleDragLeave}
        // onDrop={this.drop}
      >
        Support your position with facts by dragging them here from your fact bank.
        <div id="comment-facts-container">
          <div
            className="fact-dropslot"
            data-preceding_fact_id="first"
            data-dragged_over="false"
            onDragOver={this.allowDrop} 
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDrop={this.drop}  
          >
            {/*"Drag First Fact Here"*/}
          </div>
          {
            this.props.facts.map(fact => {
              return (
                <React.Fragment>
                  <SupportingChatFact 
                  	key={fact.id} 
                  	fact={fact} 
                  	facts={this.props.facts} 
                  	sendRemoval={(factId) => this.handleRemoveFact(factId)}
                  	handleDrag={(facts) => this.props.handleFactsUpdate(facts)}
                	/>  
                  <div 
                    className="fact-dropslot"
                    data-preceding_fact_id={fact.id}
                    data-dragged_over="false"
                    onDragOver={this.allowDrop} 
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.drop}                            
                  >
                    {/*`after fact ${fact.id}`*/}
                  </div>
                </React.Fragment>
              )                      
            })
          }
        </div>                
      </div>   
		)
	}
}

export default FactDropzone;