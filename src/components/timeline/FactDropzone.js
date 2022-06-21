import React, { Component } from 'react';

import SupportingExcerpt from "./SupportingExcerpt.js"
// import TimelineFact from "./TimelineFact.js"
import { generateContext, handleArticleClick } from "../../helpers/helpers.js"

import parse from "html-react-parser";

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
    const excerpt = this.props.facts.filter(fact => fact.id != factId)
    this.props.handleFactsUpdate(excerpt)
    
  }

	render() {
		return (
      <div 
        className="chat-fact-dropzone" 
      >
        {this.props.placeholder}
        <div className="comment-facts-container">
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
            this.props.facts.map((excerpt, index) => {
              return (
                <div className="supporting-fact-wrapper">
                  {
                    <div className="supporting-fact-style-container">
                      <div className="style supporting-fact-connector-boxes-container draft">
                        <div className="style supporting-fact-connector-box top-connector-box draft"></div>
                        <div className={`style supporting-fact-connector-box ${index+1 != this.props.facts.length ? `bottom-connector-box` : null} draft`}></div>
                      </div>
                      <div className="supporting-fact-container draft">             
                        <SupportingExcerpt
                        key={excerpt.id} 
                        fact={excerpt} 
                        facts={this.props.facts} 
                        sendRemoval={(factId) => this.handleRemoveFact(factId)}
                        handleDrag={(facts) => this.props.handleFactsUpdate(facts)}
                      />
                      </div>
                    </div>
                  }

                  <div 
                    className="fact-dropslot"
                    data-preceding_fact_id={excerpt.id}
                    data-dragged_over={this.state.draggedOver}
                    onDragOver={this.allowDrop} 
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave}
                    onDrop={this.drop}
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