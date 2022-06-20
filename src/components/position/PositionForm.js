import React, { Component } from 'react';
import "./positions.scss"

import { connect } from 'react-redux';
import { submitPosition } from "../../actions/commentsActions.js"

import SupportingChatFact from "../social/SupportingChatFact.js"
import FactDropzone from "../timeline/FactDropzone.js"
import ResponseExcerptDropzone from "../timeline/ResponseExcerptDropzone.js"
import TagsContainer from "../network/TagsContainer.js"

class PositionForm extends Component {
  componentDidMount() {
    let positionForm = document.getElementById('position-input-div')
    positionForm.addEventListener("paste", function(e) {
        e.preventDefault();
        var text = e.clipboardData.getData("text/plain");
        document.execCommand("insertHTML", false, text);
    });    
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
    
    this.props.submitPosition(
      this.state.text, 
      factIDs, 
      this.state.responseExcerpt.id, 
      this.state.tags.map(t => t.contact_id), 
      this.props.selectedGroup ? this.props.selectedGroup.id : null,
      this.clearReplyForm
    )
  }

  clearReplyForm = () => {
    this.setState({ text: '', responseExcerpt: "", facts: [], tags: [] });
    let messageInput = document.getElementById(`position-input-div`)
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
              className="comment-input-div"
              id="position-input-div"
              contentEditable="true"
              onKeyUp={this.handleChange}   
            >
            </div>
            <input 
              className="position-submit-button comment-submit-button" 
              type="submit" value={`post to ${this.props.selectedGroup ? this.props.selectedGroup.name : "timeline"}`}
              disabled={!(this.state.text || this.state.responseExcerpt)}
            />
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

export default connect(state => ({userId: state.users.userId, selectedGroup: state.groups.selectedGroup}), { submitPosition })(PositionForm);
