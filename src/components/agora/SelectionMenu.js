import React, { Component } from 'react';
import NewCommentFact from "./NewCommentFact.js"

class SelectionMenu extends Component {
	state = {
		comment: "",
		rephrase: "",
		draggedOver: false,
		facts: [],
		selectionMenu: "post comment"
	}

	componentDidUpdate() {
		if (this.state.selectionMenu === "post comment" && this.state.comment && this.state.facts.length) {
			const commentSubmit = document.getElementById("comment-submit");
			commentSubmit.disabled = false
			// commentSubmit.style.backgroundColor = "grey"

		} else if (this.state.selectionMenu === "post comment") {
			const commentSubmit = document.getElementById("comment-submit");
			commentSubmit.disabled = true
			// commentSubmit.style.backgroundColor = "#0f4c75"
		}
	}

	handleChange = e => {
		this.setState({[e.target.name]: e.target.value})

	}

	handleSelectionOption = e => {
		this.setState({
			...this.state,
			selectionMenu: e.target.innerText
		})
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

	render() {
		return (
			<div>
				<div id={this.props.id}>
					<span id="selection-menu-close-button" className="close-button" onClick={this.props.closePopup}>X</span>
					<div id="selection-options-wrapper">
						<div id="selection-buttons-wrapper">
							<button className={`selection-button ${this.state.selectionMenu === "post comment" ? "selected" : null}`} id="post-comment-option" onClick={this.handleSelectionOption} style={{"border-radius": "5px 0px 0px 5px"}}>post comment</button>
							<button className={`selection-button ${this.state.selectionMenu === "collect fact" ? "selected" : null}`} id="collect-fact-option" onClick={this.handleSelectionOption} style={{"border-radius": "0px 5px 5px 0px"}}>collect fact</button>
						</div>						
						{this.state.selectionMenu === "post comment"
							?
								<div id="new-comment-form-wrapper">
									<form className="selection-form" onSubmit={(e) => this.props.submitComment(e, this.state.comment, this.state.facts)} id="new-comment-form">
										<div className="selection-textarea-label" style={{"font-size": "1.1em"}}>Comment:</div>
										<textarea className="selection-menu-textarea" id="comment-textarea" onChange={this.handleChange} value={this.state.comment} name="comment" cols="40" rows="5" placeholder="Try to phrase your comment so that it makes sense as a standalone statement."></textarea> <br/>
										<div id="comment-facts-container">
											{this.state.facts.map(fact => <NewCommentFact key={fact.id} fact={fact}/>) }
										</div>
										<div 
											id="comment-fact-dropzone" 
											onDragOver={this.allowDrop} 
											onDragEnter={this.handleDragEnter}
											onDragLeave={this.handleDragLeave}
											onDrop={this.drop}
											className={this.state.draggedOver ? "dragged-over" : "" }
										>
											DRAG SUPPORTING FACT HERE
										</div>
										<input className="selection-action-submit" id="comment-submit" type="submit" value="post comment" disabled="true"/>
									</form>
								</div>	
							:
								<div id="add-fact-form-wrapper">
									<form className="selection-form" onSubmit={(e) => this.props.collectFact(e, this.state.rephrase)} id="add-fact-form-form">
										<div style={{"font-size": "1.1em"}}>Rephrase (optional):</div>
										<textarea className="selection-menu-textarea" id="rephrase-textarea" onChange={this.handleChange} value={this.state.rephrase} name="rephrase" cols="40" rows="5" placeholder="If your selection does not make logical or grammatical sense as a standalone fact, or needs to be rephrased for another reason, do so here."></textarea> <br/>
										<input className="selection-action-submit" id="rephrase-submit" type="submit" value="collect fact" />
									</form>
								</div>
						}

					</div>

					<div id="arrow" data-popper-arrow></div>
				</div>
			</div>

		)
	}
}


export default SelectionMenu;

					// <button id="collectFact" onClick={this.handleClick} >Collect Fact</button>
					// <button id="createComment" onClick={this.handleClick} >Create Comment</button>
