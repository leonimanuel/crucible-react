import React, { Component } from 'react';
import { API_ROOT, HEADERS } from '../../../constants';
import { connect } from 'react-redux';

class NewMessageForm extends Component {
  state = {
    text: '',
  }

  handleChange = e => {
    this.setState({ text: e.target.value });
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
  }

  render = () => {
    // debugger
    return (
      <div className="newMessageForm">
        <form onSubmit={this.handleSubmit}>
          <label>New Message:</label>
          <br />
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
