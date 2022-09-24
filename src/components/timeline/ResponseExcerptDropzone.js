import React, { Component } from 'react';
import { generateContext, handleArticleClick } from "../../helpers/helpers.js"

import SupportingChatFact from "../social/SupportingChatFact.js"
import parse from "html-react-parser";

class ResponseExcerptDropzone extends Component {
  state = {
    draggedOver: false
  }

  allowDrop = e => {
    e.preventDefault();
    // this.setState({draggedOver: true})
    e.target.dataset.dragged_over = true
  }

  handleDragEnter = e => {
    e.persist();
    // this.setState({draggedOver: true})
    e.target.dataset.dragged_over = true
  }

  handleDragLeave = e => {
    e.persist();
    // this.setState({draggedOver: false})
    e.target.dataset.dragged_over = false
  }

  drop = e => {
    e.preventDefault();
    // this.setState({draggedOver: false})
    e.target.dataset.dragged_over = false
    // console.log(JSON.parse(e.dataTransfer.getData("object")))
    let transferObj = JSON.parse(e.dataTransfer.getData("object"))
    e.persist()

    let draggedFact = transferObj.fact    
    this.props.handleResponseExcerptUpdate(draggedFact)
  }	

  handleRemoveExcerpt = () => { 
    this.props.handleResponseExcerptRemoval()
  }

	render() {
		const excerpt = this.props.responseExcerpt

    return (
      <React.Fragment>
        {
          excerpt 
            ?
          <div className="timeline-comment-context-wrapper">
            <div className="article-anchor-wrapper">
              <a 
                className="article-anchor reply-excerpt" 
                href={excerpt.article_url} 
                onClick={(e, resoure) => handleArticleClick(e, excerpt)}
              >
                {excerpt.article_title || excerpt.article_url.split("/")[2].replace("www.", "")}
              </a>
            </div> 

            <div className="timeline-comment-context-bubble">
              {excerpt.node_text ? <div className="timeline-comment-context">...{parse(generateContext(excerpt))}...</div> : <div className="timeline-comment-context">{excerpt.content}</div>}
              <div className="remove-fact-button" onClick={this.handleRemoveExcerpt}>✕</div>
            </div>
          </div>
            :
          <React.Fragment>
            <div className="chat-fact-dropzone-bubble desktop">          
              <div 
                className="chat-fact-dropzone"
                data-preceding_fact_id="first"
                data-dragged_over="false"
                onDragOver={this.allowDrop} 
                onDragEnter={this.handleDragEnter}
                onDragLeave={this.handleDragLeave}
                onDrop={this.drop}
                style={{display: this.props.dropType == "responseExcerpt" && this.props.facts.length ? "none" : "block"}}  
              >
                {this.props.placeholder}          
              </div> 
            </div>
            <div className="chat-fact-dropzone-bubble mobile">drag & drop excerpts are not available on mobile browser</div>            
          </React.Fragment>
        }          
      </React.Fragment>
		)
	}
}

export default ResponseExcerptDropzone;