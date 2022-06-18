import React, { Component } from 'react';

import SupportingChatFact from "../social/SupportingChatFact.js"

class FactDropzone extends Component {
  state = {
    draggedOver: false
  }

  allowDrop = e => {
    e.preventDefault();
    // this.setState({draggedOver: true})
    e.target.dataset.dragged_over = true
  }

  handleDragEnter = e => {
    e.persist();
    // this.setState({draggedOver: true})
    e.target.dataset.dragged_over = true
  }

  handleDragLeave = e => {
    e.persist();
    // this.setState({draggedOver: false})
    e.target.dataset.dragged_over = false
  }

  drop = e => {
    e.preventDefault();
    // this.setState({draggedOver: false})
    e.target.dataset.dragged_over = false
    // console.log(JSON.parse(e.dataTransfer.getData("object")))
    let transferObj = JSON.parse(e.dataTransfer.getData("object"))
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
      
      if (this.props.dropType == "responseExcerpt") {
        this.props.handleResponseExcerptUpdate(draggedFact)
      }
      else if (this.props.dropType == "supportingFacts") {
        if (precedingFactId == "first") {
          // this.setState({facts: [draggedFact, ...filteredFacts]})        
          this.props.handleFactsUpdate([draggedFact, ...filteredFacts])
        } else {
          let precedingFactIndex = filteredFacts.indexOf(this.props.facts.find(f => f.id == precedingFactId))
          filteredFacts.splice(precedingFactIndex + 1, 0, draggedFact)
          
          // this.setState({facts: filteredFacts})
          
          this.props.handleFactsUpdate(filteredFacts)
        }
      }
    // }
  }	

  handleRemoveFact = (factId) => { //removes fact from new chat fact array
    // this.setState({facts: this.state.facts.filter(fact => fact.id != factId)})
    const excerpt = this.props.facts.filter(fact => fact.id != factId)
    debugger
    if (this.props.dropType == "responseExcerpt") {this.props.handleResponseExcerptRemoval()}
    else if (this.props.dropType == "supportingFacts") {this.props.handleFactsUpdate(excerpt)}
    
  }

	render() {
		return (
      <div 
        id="chat-fact-dropzone" 
      >
        {this.props.placeholder}
        <div id="comment-facts-container">
          <div
            className="fact-dropslot"
            data-preceding_fact_id="first"
            data-dragged_over="false"
            onDragOver={this.allowDrop} 
            onDragEnter={this.handleDragEnter}
            onDragLeave={this.handleDragLeave}
            onDrop={this.drop}
            style={{display: this.props.dropType == "responseExcerpt" && this.props.facts.length ? "none" : "block"}}  
          >
            {/*"Drag First Fact Here"*/}
          </div>
          {
            this.props.facts.map(fact => {
              return (
                <div className="supporting-fact-wrapper">
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
                    data-dragged_over={this.state.draggedOver}
                    onDragOver={this.allowDrop} 
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.drop}
                    style={{display: this.props.dropType == "responseExcerpt" ? "none" : "block"}}                         
                  >
                    {/*`after fact ${fact.id}`*/}
                  </div>

                  {/*<div className="dropslot-spacer" style={{height: this.state.draggedOver ? "50px" : "10px"}}>dropslot spacer</div>*/}
                </div>
              )                      
            })
          }
        </div>                
      </div>   
		)
	}
}

export default FactDropzone;