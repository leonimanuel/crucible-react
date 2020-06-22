import React, { Component } from 'react';

class SelectionMenu extends Component {
	state = {
		action: "createComment",
		comment: "",
		draggedOver: false
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
		debugger
		// let originTopicName = e.dataTransfer.getData("text").split("-")[0]
		// let factId = parseInt(e.dataTransfer.getData("text").split("-").pop());
		// let originTopic = transferObj.parentTopic
		// let fact = transferObj.fact

		this.setState({...this.state, draggedOver: false})
	}


	handleCreateComment = () => {
		return (
			<div id="new-comment-form">
				New Comment
				<form onSubmit={(e) => this.props.submit(e, this.state.comment)} id="new-comment-form">
					Comment: <textarea onChange={this.handleChange} value={this.state.comment} name="comment" id="" cols="20" rows="3"></textarea> <br/>
					<input type="submit" value="post"/>
					<div 
						id="comment-fact-box" 
						onDragOver={this.allowDrop} 
						onDragEnter={this.handleDragEnter}
						onDragLeave={this.handleDragLeave}
						onDrop={this.drop}
						className={this.state.draggedOver ? "dragged-over" : "" }
					>
						DROP FACTS IN ME
					</div>
				</form>
			</div>	
		)
	}




	render() {
		// debugger
		// const { match } = this.props;
		return (
			<div>
				<div id={this.props.id}>
					{this.state.action === "createComment" ? this.handleCreateComment() : null}
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
