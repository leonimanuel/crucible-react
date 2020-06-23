import React, { Component } from 'react';
import NewCommentFact from "./NewCommentFact.js"

class SelectionMenu extends Component {
	state = {
		comment: "",
		draggedOver: false,
		facts: []
	}

	handleChange = e => {
		this.setState({
			...this.state,
			comment: e.target.value
		})
		console.log(e.target.value)
		// this.props.glorp()
	}

	handleClick = e => {
		this.setState({
			...this.state,
			action: e.target.id
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
					<div id="new-comment-form">
						New Comment
						<form onSubmit={(e) => this.props.submit(e, this.state.comment, this.state.facts)} id="new-comment-form">
							Comment: <textarea onChange={this.handleChange} value={this.state.comment} name="comment" id="" cols="20" rows="3"></textarea> <br/>
		
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
								DRAG FACTS HERE
							</div>
							<input type="submit" value="post"/>
						</form>
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
