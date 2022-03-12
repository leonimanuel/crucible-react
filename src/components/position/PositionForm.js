import React, { Component } from 'react';
import { API_ROOT } from '../../constants';
import { connect } from 'react-redux';
import { submitPosition } from "../../actions/commentsActions.js"

import SupportingChatFact from "../social/SupportingChatFact.js"

class PositionForm extends Component {
  state = {
    text: '',
    draggedOver: false,    
    facts: [
      {"id":6,"content":"U.S. Customs and Border Protection had contracted with MSAB, a Swedish company specializing in digital device cracking, to purchase vehicle forensics kits manufactured by Berla","rephrase":null,"url":"https://theintercept.com/2021/11/18/bill-warrantless-searches-car-data-police/","logic_upvotes":0,"logic_downvotes":0,"context_upvotes":0,"context_downvotes":0,"credibility_upvotes":0,"credibility_downvotes":0,"review_status":"pending","topic_id":1},{"id":9,"content":"After Hurricane Harvey devastated Houston in 2017, voters approved a $2.5 billion bond to fund more than 500 flood-control projects around the county","rephrase":null,"url":"https://www.nytimes.com/2021/12/03/climate/climate-change-infrastructure-bill.html","logic_upvotes":0,"logic_downvotes":0,"context_upvotes":0,"context_downvotes":0,"credibility_upvotes":0,"credibility_downvotes":0,"review_status":"pending","topic_id":1},{"id":24,"content":"A widespread urban center more than 12 miles across, Caracol at its high point (A.D. 250 to 950) held at least 100,000 inhabitants.","rephrase":null,"url":"https://www.nationalgeographic.com/travel/article/explore-the-palaces-and-tombs-of-these-lost-cities-across-the-americas","logic_upvotes":0,"logic_downvotes":0,"context_upvotes":0,"context_downvotes":0,"credibility_upvotes":0,"credibility_downvotes":0,"review_status":"pending","topic_id":1}
    ]
  }

  componentDidUpdate() {
    const commentSubmit = document.getElementById("position-submit-button");
    if (commentSubmit) {
      if (this.state.facts.length) {      
        commentSubmit.disabled = false
        // commentSubmit.style.backgroundColor = "grey"

      } else {
        commentSubmit.disabled = true
        // commentSubmit.style.backgroundColor = "#0f4c75"
      }
    }
  }

  handleChange = e => {
    e.persist()
    this.setState({ text: e.target.innerText }, () => {
      if (e.key === "Enter") { 
        // debugger
        this.handleSubmit(e) 
        // e.target.innerHTML = ""
      }
    });
  }

  handleSubmit = e => {
    const factIDs = this.state.facts.map(fact => fact.id)
    e.preventDefault();

    this.props.submitPosition(this.state.text, factIDs)
    
    this.setState({ text: '', facts: [] });
  }

  allowDrop = e => {
    e.preventDefault();
    e.target.dataset.dragged_over = "true"
  }

  handleDragEnter = e => {
    e.persist();
    this.setState({...this.state, draggedOver: true }, () => {      
      e.target.dataset.dragged_over = "true"
      // e.target.style.height = "50px"
    })
  }

  handleDragLeave = e => {
    e.persist();
    this.setState({...this.state, draggedOver: false }, () => {
      e.target.dataset.dragged_over = "false"
      // e.target.style.height = "20px"
    })
  }

  drop = e => {
    e.preventDefault();
    e.target.dataset.dragged_over = "false"
    console.log(JSON.parse(e.dataTransfer.getData("object")))
    let transferObj = JSON.parse(e.dataTransfer.getData("object"))
    
    if (transferObj.origin == "factbank") {
      if (this.state.facts.find(fact => fact.id == transferObj.fact.id)) {
        
        alert("you've already added this fact.")
      } else {
        this.setState({
          ...this.state,
          facts: [...this.state.facts, transferObj.fact],
          draggedOver: false
        })
      }
    } 
    else if (transferObj.origin == "dropzone") {      
      e.persist()
      
      let precedingFactId = e.target.dataset.preceding_fact_id
      let draggedFact = transferObj.fact
      let filteredFacts = this.state.facts.filter(f => f.id != draggedFact.id)
      
      if (precedingFactId == "first") {
        this.setState({facts: [draggedFact, ...filteredFacts]}, () => {
          // e.target.dataset.dragged_over = "false"
          // e.target.style.height = "20px;"
        })        
      } else {
        let precedingFactIndex = filteredFacts.indexOf(this.state.facts.find(f => f.id == precedingFactId))
        filteredFacts.splice(precedingFactIndex + 1, 0, draggedFact)
        
        this.setState({facts: filteredFacts}, () => {
          // e.target.dataset.dragged_over = "false"
          // e.target.style.height = "20px;"
        })
      }
    }
  }

  handleRemoveFact = (factId) => { //removes fact from new chat fact array
    this.setState({facts: this.state.facts.filter(fact => fact.id != factId)})
  }

  render = () => {
    let messageInput = document.getElementById("message-input-div")
    // debugger
    if (messageInput) {
      // messageInput.style = `height: ${messageInput.scrollHeight}px`
      console.log(messageInput.clientHeight)
    }
    return (
      <div id="position-form-wrapper">      
        <div id="position-form-container"> 
          <form id="position-form" onSubmit={this.handleSubmit}>
            <div 
              id="position-input-div" 
              contentEditable="true"
              dataPlaceholder="Start a Position"
              onKeyUp={this.handleChange}   
            >
            </div>
            <input id="position-submit-button" type="submit" value="publish position" disabled="true" />
          </form>
        
        
          { this.state.facts.length <= 4 
            ?
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
                    this.state.facts.map(fact => {
                      return (
                        <React.Fragment>
                          <SupportingChatFact key={fact.id} fact={fact} sendRemoval={(factId) => this.handleRemoveFact(factId)}/>  
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
            :
              null         
          }
        </div>
      </div>
    );
  };
}

export default connect(state => ({userId: state.users.userId}), { submitPosition })(PositionForm);
