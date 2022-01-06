import React, { Component } from 'react';
import { API_ROOT } from '../../constants';
import { connect } from 'react-redux';
import { createReply } from "../../actions/timelineActions.js"

import SupportingChatFact from "../social/SupportingChatFact.js"

class ReplyForm extends Component {
  state = {
    text: '',
    draggedOver: false,    
    facts: []
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
    
    this.props.createReply(this.state.text, this.props.comment.id, factIDs, this.clearReplyForm)
  }

  clearReplyForm = () => {
    debugger
    this.setState({ text: '', facts: [] });
    let messageInput = document.getElementById(`reply-input-div-${this.props.index}`)
    messageInput.innerHTML = ""
  }

  allowDrop = e => {
    e.preventDefault();
  }

  handleDragEnter = e => {
    this.setState({...this.state, draggedOver: true })
  }

  handleDragLeave = e => {
    this.setState({...this.state, draggedOver: false })
  }

  drop = e => {
    e.preventDefault();
    console.log(JSON.parse(e.dataTransfer.getData("object")))
    let transferObj = JSON.parse(e.dataTransfer.getData("object"))
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

  handleRemoveFact = (factId) => { //removes fact from new chat fact array
    this.setState({facts: this.state.facts.filter(fact => fact.id != factId)})
  }

  render = () => {
    return (
      <div className="reply-form" >
        <form className="reply-form-subcontainer" onSubmit={this.handleSubmit}>
          <div 
            className="reply-input-div"
            id={`reply-input-div-${this.props.index}`}
            contentEditable="true"
            onKeyPress={this.handleChange}   
          >
          </div>
          <input className="reply-submit-button" type="submit" />
        </form>
      
        <div id="comment-facts-container">
          {this.state.facts.map(fact => <SupportingChatFact key={fact.id} fact={fact} sendRemoval={(factId) => this.handleRemoveFact(factId)}/>)}
        </div>
      
        { this.state.facts.length <= 2 
          ?
            <div 
              onDragOver={this.allowDrop} 
              onDragEnter={this.handleDragEnter}
              onDragLeave={this.handleDragLeave}
              onDrop={this.drop}
              className={`reply-fact-dropzone ${this.state.draggedOver ? "dragged-over" : ""}`}
            >
              Drag your facts here to support your message. messages supported by facts earn credit.
            </div>       
          :
            null         
        }
  
      </div>
    );
  };
}

export default connect(state => ({userId: state.users.userId}), { createReply })(ReplyForm);
