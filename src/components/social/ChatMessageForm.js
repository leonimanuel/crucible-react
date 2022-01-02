import React, { Component } from 'react';
import { API_ROOT } from '../../constants';
import { connect } from 'react-redux';

import SupportingChatFact from "./SupportingChatFact.js"

class ChatMessageForm extends Component {
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
    e.preventDefault();
    
    let configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        text: this.state.text,
        userId: this.props.userId
      })
    }
    fetch(`${API_ROOT}/comments/${this.props.comment.id}/messages`, configObj)
      .then(resp => resp.json())
      .then((data) => {
        debugger
      })
    
    this.setState({ text: '' });
    let messageInput = document.getElementById("message-input-div")
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
    this.setState({
      ...this.state,
      facts: [...this.state.facts, transferObj.fact],
      draggedOver: false
    })
  }

  handleRemoveFact = (factId) => { //removes fact from new chat fact array
    this.setState({facts: this.state.facts.filter(fact => fact.id != factId)})
  }

  render = () => {
    // let messageInput = document.getElementById("message-input")
    // // debugger
    // if (messageInput) {
    //   messageInput.style = `height: ${messageInput.scrollHeight}px`
    // }
    return (
      <div id="newMessageForm">
        <form id="message-form" onSubmit={this.handleSubmit}>
          <div 
            id="message-input-div" 
            contentEditable="true"
            onKeyPress={this.handleChange}   
          >
          </div>
          <input id="message-submit-button" type="submit" />
        </form>
      
        <div id="comment-facts-container">
          {this.state.facts.map(fact => <SupportingChatFact key={fact.id} fact={fact} sendRemoval={(factId) => this.handleRemoveFact(factId)}/>)}
        </div>
      
        <div 
          id="chat-fact-dropzone" 
          onDragOver={this.allowDrop} 
          onDragEnter={this.handleDragEnter}
          onDragLeave={this.handleDragLeave}
          onDrop={this.drop}
          className={this.state.draggedOver ? "dragged-over" : "" }
        >
          Drag facts here to support your message. messages supported by facts earn credit.
        </div>        
      </div>
    );
  };
}

export default connect(state => ({userId: state.users.userId}))(ChatMessageForm);
