import React, { Component } from 'react';
import "./positions.scss"

import { connect } from 'react-redux';
import { createReply } from "../../actions/timelineActions.js"

import SupportingChatFact from "../social/SupportingChatFact.js"
import FactDropzone from "../timeline/FactDropzone.js"
import ResponseExcerptDropzone from "../timeline/ResponseExcerptDropzone.js"
import TagsContainer from "../network/TagsContainer.js"

class PositionForm extends Component {
  componentDidMount() {
    let replyForms = document.querySelectorAll('.reply-input-div')
    replyForms.forEach(replyForm => {
      replyForm.addEventListener("paste", function(e) {
          debugger
          e.preventDefault();
          var text = e.clipboardData.getData("text/plain");
          document.execCommand("insertHTML", false, text);
      });    
    })
  }

  state = {
    text: '',
    draggedOver: false,    
    responseExcerpt: "",
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
    
    this.props.createReply(this.state.text, this.props.comment.id, factIDs, this.state.responseExcerpt.id, this.state.tags.map(t => t.contact_id), this.clearReplyForm)
  }

  clearReplyForm = () => {
    this.setState({ text: '', responseExcerpt: "", facts: [], tags: [] });
    let messageInput = document.getElementById(`reply-input-div-${this.props.index}`)
    messageInput.innerHTML = ""
  }

  updateResponseExcerpt = (excerpt) => {
    this.setState({responseExcerpt: excerpt})
  }

  removeResponseExcerpt = () => {
    this.setState({responseExcerpt: ""})
  }

  updateFacts = (facts) => {
    this.setState({facts: facts})
  }  

  handleTagsUpdate = (tags) => {
    this.setState({tags: tags})
  }  

  render = () => {
    return (
      <div className="position-form comment-form" >
        <ResponseExcerptDropzone 
          responseExcerpt={this.state.responseExcerpt}
          handleResponseExcerptUpdate={(excerpt) => this.updateResponseExcerpt(excerpt)}
          handleResponseExcerptRemoval={this.removeResponseExcerpt}       
          placeholder="responding to an excerpt? drag & drop it here."             
        />

        <div className="position-form-subcontainer-bubble comment-form-subcontainer-bubble">
          <form className="position-form-subcontainer comment-form-subcontainer" onSubmit={this.handleSubmit}>
            <div 
              className="position-input-div comment-input-div"
              contentEditable="true"
              onKeyUp={this.handleChange}   
            >
            </div>
            <input className="position-submit-button comment-submit-button" type="submit" />
          </form>
        </div>
      
        <FactDropzone 
          facts={this.state.facts} 
          handleFactsUpdate={(facts) => this.updateFacts(facts)}
          placeholder="Support your position with facts by dragging them here from your fact bank."
          dropType="supportingFacts"
        />
        <TagsContainer updateTags={this.handleTagsUpdate} tags={this.state.tags}/>
      </div>
    );
  };
}

export default connect(state => ({userId: state.users.userId}), { createReply })(PositionForm);
