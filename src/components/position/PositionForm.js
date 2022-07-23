import React, { Component } from 'react';
import "./positions.scss"

import { connect } from 'react-redux';
import { withRouter } from "react-router";
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
    startPostSelected: false,
    showInputPlaceholder: true,
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
      this.state.tags.map(t => t.value), 
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

  handleNewPositionClick = () => {
    if (this.props.userId) {
      this.setState({startPostSelected: !this.state.startPostSelected})
    } else {
      this.props.history.push("/signup");
    }
  }

  render = () => {
    return (
      <div className="position-form comment-form" >
        {
          <React.Fragment>
            <button 
              id="create-post-button"
              className={`button-51 ${this.state.startPostSelected ? "hidden" : "visibile"}`} 
              role="button"
              onClick={() => this.handleNewPositionClick() }
            >
              {this.props.userId ? "New Post" : "Join to post"}
            </button>

            <div 
              className={`expanded-position-form ${this.state.startPostSelected ? "expanded" : ""}`}
            >
              <ResponseExcerptDropzone 
                responseExcerpt={this.state.responseExcerpt}
                handleResponseExcerptUpdate={(excerpt) => this.updateResponseExcerpt(excerpt)}
                handleResponseExcerptRemoval={this.removeResponseExcerpt}       
                placeholder="responding to something you read? Drag the excerpt here from the left-hand menu."
              />

              <div className="position-form-subcontainer-bubble comment-form-subcontainer-bubble">
                <form className="position-form-subcontainer comment-form-subcontainer" onSubmit={this.handleSubmit}>
                  <div 
                    className={`comment-input-div ${this.state.text ? "contains-text" : "no-text"}`}
                    id="position-input-div"
                    contentEditable="true"
                    onKeyUp={this.handleChange}
                    onFocus={() => this.setState({showInputPlaceholder: false})}
                    onBlur={() => this.setState({showInputPlaceholder: true})}
                  >
                  </div>
                  <input 
                    className="position-submit-button comment-submit-button form-action-button" 
                    type="submit" value={`post to ${this.props.selectedGroup ? this.props.selectedGroup.name : "timeline"}`}
                    disabled={!(this.state.text || this.state.responseExcerpt) || (this.state.facts.length && !this.state.text)}
                  />
                </form>
              </div>
            
              <FactDropzone 
                facts={this.state.facts} 
                handleFactsUpdate={(facts) => this.updateFacts(facts)}
                placeholder="Support your comment by dragging an excerpt here (optional)."
                dropType="supportingFacts"
              />
              <TagsContainer updateTags={this.handleTagsUpdate} tags={this.state.tags} selectedGroupId={this.props.selectedGroup.id}/>
            </div>        
          </React.Fragment>
        }
      </div>
    );
  };
}

export default connect(state => ({userId: state.users.userId, selectedGroup: state.groups.selectedGroup}), { submitPosition })(withRouter(PositionForm));
