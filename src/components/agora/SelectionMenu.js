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
			document.getElementById("comment-submit").disabled = false;
		} else if (this.state.selectionMenu === "post comment") {
			document.getElementById("comment-submit").disabled = true;
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
		// debugger
		// const { match } = this.props;
		return (
			<div>
				<div id={this.props.id}>
					<span id="selection-menu-close-button" className="close-button" onClick={this.props.closePopup}>X</span>
					<div id="selection-options-wrapper">
						<button id="post-comment-option" onClick={this.handleSelectionOption}>post comment</button>
						<button id="collect-fact-option" onClick={this.handleSelectionOption}>add fact</button>
						{this.state.selectionMenu === "post comment"
							?
								<div id="new-comment-form-wrapper">
									<form onSubmit={(e) => this.props.submitComment(e, this.state.comment, this.state.facts)} id="new-comment-form">
										<div style={{"font-size": "1.1em"}}>Comment:</div>
										<textarea className="selection-menu-textarea" id="comment-textarea" onChange={this.handleChange} value={this.state.comment} name="comment" cols="40" rows="5"></textarea> <br/>
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
										<input id="comment-submit" type="submit" value="post" disabled="true"/>
									</form>
								</div>	
							:
								<div id="add-fact-form-wrapper">
									<form onSubmit={(e) => this.props.collectFact(e, this.state.rephrase)} id="add-fact-form-form">
										<div style={{"font-size": "1.1em"}}>Rephrase:</div>
										<textarea className="selection-menu-textarea" id="rephrase-textarea" onChange={this.handleChange} value={this.state.rephrase} name="rephrase" cols="40" rows="5"></textarea> <br/>
										<input id="rephrase-submit" type="submit" value="post" />
									</form>
								</div>
						}

					</div>

					<div id="arrow" data-popper-arrow></div>
				</div>

				<div id="collect-fact-button" onClick={this.props.collectFact}>+</div>			
			</div>

		)
	}
}


export default SelectionMenu;

					// <button id="collectFact" onClick={this.handleClick} >Collect Fact</button>
					// <button id="createComment" onClick={this.handleClick} >Create Comment</button>
