import React, { Component } from 'react';
import { API_ROOT, HEADERS } from '../../../constants';
import { connect } from 'react-redux';

class NewMessageForm extends Component {
  state = {
    text: '',
  }

  handleChange = e => {
    debugger
    e.persist()
    // let key = e.key
    this.setState({ text: e.target.innerText }, () => {
      if (e.key == "Enter") { 
        debugger
        this.handleSubmit(e) 
        // e.target.innerHTML = ""
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    debugger
    fetch(`${API_ROOT}/groups/${this.props.discussion.group_id}/discussions/${this.props.discussion.id}/messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        text: this.state.text,
        userId: this.props.userId
      })
    });
    this.setState({ text: '' });
    if (e.target.id === "message-input-div") {
      e.target.innerHTML = ""
    }
  }

  render = () => {
    let messageInput = document.getElementById("message-input")
    // debugger
    if (messageInput) {
      messageInput.style = `height: ${messageInput.scrollHeight}px`
    }
    return (
      <div id="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
          <div 
            id="message-input-div" 
            contenteditable="true"
            onKeyPress={this.handleChange}   
          >

          </div>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <input type="submit" />
        </form>
      </div>
    );
  };
}

export default connect(state => ({userId: state.users.userId}))(NewMessageForm);
