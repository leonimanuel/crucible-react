import React, { Component } from 'react';
import { API_ROOT } from '../../../constants';
import { connect } from 'react-redux';

class NewMessageForm extends Component {
  state = {
    text: '',
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

    fetch(`${API_ROOT}/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.id}/messages`, configObj);
    
    this.setState({ text: '' });
    let messageInput = document.getElementById("message-input-div")
    messageInput.innerHTML = ""
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
      </div>
    );
  };
}

export default connect(state => ({userId: state.users.userId}))(NewMessageForm);
