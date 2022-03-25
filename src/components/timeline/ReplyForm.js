import React, { Component } from 'react';
import { API_ROOT } from '../../constants';
import { connect } from 'react-redux';
import { createReply } from "../../actions/timelineActions.js"

import SupportingChatFact from "../social/SupportingChatFact.js"
import FactDropzone from "./FactDropzone.js"
import TagsContainer from "../network/TagsContainer.js"

class ReplyForm extends Component {
  state = {
    text: '',
    draggedOver: false,    
    facts: [],
    tags: []
  }

  handleChange = e => {
    e.persist()
    this.setState({ text: e.target.innerText }, () => {
      // if (e.key === "Enter") { 
      //   this.handleSubmit(e) 
      // }
    });
  }

  handleSubmit = e => {
    const factIDs = this.state.facts.map(fact => fact.id)
    e.preventDefault();
    
    this.props.createReply(this.state.text, this.props.comment.id, factIDs, this.state.tags.map(t => t.contact_id), this.clearReplyForm)
  }

  clearReplyForm = () => {
    this.setState({ text: '', facts: [] });
    let messageInput = document.getElementById(`reply-input-div-${this.props.index}`)
    messageInput.innerHTML = ""
  }

  updateFacts = (facts) => {
    this.setState({facts: facts})
  }  

  handleTagsUpdate = (tags) => {
    this.setState({tags: tags})
  }  

  render = () => {
    return (
      <div className="reply-form" >
        <form className="reply-form-subcontainer" onSubmit={this.handleSubmit}>
          <div 
            className="reply-input-div"
            id={`reply-input-div-${this.props.index}`}
            contentEditable="true"
            onKeyUp={this.handleChange}   
          >
          </div>
          <input className="reply-submit-button" type="submit" />
        </form>
      
        <FactDropzone facts={this.state.facts} handleFactsUpdate={(facts) => this.updateFacts(facts)}/>
        <TagsContainer updateTags={this.handleTagsUpdate} tags={this.state.tags}/>
      </div>
    );
  };
}

export default connect(state => ({userId: state.users.userId}), { createReply })(ReplyForm);
