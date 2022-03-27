import React, { Component } from 'react';
import { API_ROOT } from '../../constants';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { submitPosition } from "../../actions/commentsActions.js"

import SupportingChatFact from "../social/SupportingChatFact.js"
import FactDropzone from "../timeline/FactDropzone.js"
import TagsContainer from "../network/TagsContainer.js"

class PositionForm extends Component {
  state = {
    text: '',
    draggedOver: false,    
    facts: [
      // {"id":6,"content":"U.S. Customs and Border Protection had contracted with MSAB, a Swedish company specializing in digital device cracking, to purchase vehicle forensics kits manufactured by Berla","rephrase":null,"url":"https://theintercept.com/2021/11/18/bill-warrantless-searches-car-data-police/","logic_upvotes":0,"logic_downvotes":0,"context_upvotes":0,"context_downvotes":0,"credibility_upvotes":0,"credibility_downvotes":0,"review_status":"pending","topic_id":1},{"id":9,"content":"After Hurricane Harvey devastated Houston in 2017, voters approved a $2.5 billion bond to fund more than 500 flood-control projects around the county","rephrase":null,"url":"https://www.nytimes.com/2021/12/03/climate/climate-change-infrastructure-bill.html","logic_upvotes":0,"logic_downvotes":0,"context_upvotes":0,"context_downvotes":0,"credibility_upvotes":0,"credibility_downvotes":0,"review_status":"pending","topic_id":1},{"id":24,"content":"A widespread urban center more than 12 miles across, Caracol at its high point (A.D. 250 to 950) held at least 100,000 inhabitants.","rephrase":null,"url":"https://www.nationalgeographic.com/travel/article/explore-the-palaces-and-tombs-of-these-lost-cities-across-the-americas","logic_upvotes":0,"logic_downvotes":0,"context_upvotes":0,"context_downvotes":0,"credibility_upvotes":0,"credibility_downvotes":0,"review_status":"pending","topic_id":1}
    ],
    tags: []
  }

  componentWillUpdate(prevProps) {
    if (this.props.newPositions.length != prevProps.newPositions.length) {
      this.setState({ text: '', facts: [], tags: [] });
    }
  }

  componentDidUpdate() {
    const commentSubmit = document.getElementById("position-submit-button");
    if (commentSubmit) {
      if (this.state.facts.length && this.state.text) {      
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
      // if (e.key === "Enter" && this.state.text) { 
      //   this.handleSubmit(e) 
      // }
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const factIDs = this.state.facts.map(fact => fact.id)
    
    if (this.state.text && factIDs.length) {
      this.props.submitPosition(this.state.text, factIDs, this.state.tags.map(t => t.contact_id))    
      
    }
  }

  updateFacts = (facts) => {
    this.setState({facts: facts})
  }

  handleTagsUpdate = (tags) => {
    this.setState({tags: tags})
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
              dataPlaceholder="Post a Position"
              onKeyUp={this.handleChange}   
            >
            </div>
            <input id="position-submit-button" type="submit" value="publish position" disabled="true" />
          </form>

          <FactDropzone facts={this.state.facts} handleFactsUpdate={(facts) => this.updateFacts(facts)}/>          
          {this.state.text || this.state.facts.length ? <div><TagsContainer updateTags={this.handleTagsUpdate} tags={this.state.tags}/></div> : null}   
        </div>  
        
        {/*<p data-tip='This is a position' id="position-form-tooltip">?</p>
        <ReactTooltip />*/}              
      </div>
    );
  };
}

const mapStateToProps = state => {
  return {
    userId: state.users.userId,
    newPositions: state.timeline.newPositions
  }
}

export default connect(mapStateToProps, { submitPosition })(PositionForm);










