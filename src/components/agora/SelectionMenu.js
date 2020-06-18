import React, { Component } from 'react';

class SelectionMenu extends Component {
	state = {
		action: "",
		comment: ""
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

	handleCreateComment = () => {
		return (
			<div id="new-comment-form">
				New Comment
				<form onSubmit={(e) => this.props.submit(e, this.state.comment)} id="new-comment-form">
					Comment: <textarea onChange={this.handleChange} value={this.state.comment} name="comment" id="" cols="20" rows="3"></textarea> <br/>
					<input type="submit" value="post"/>
				</form>
			</div>	
		)
	}

	render() {
		// const { match } = this.props;
		return (
			<div id={this.props.id}>
				<button id="collectFact" onClick={this.handleClick} >Collect Fact</button>
				<button id="createComment" onClick={this.handleClick} >Create Comment</button>
				{this.state.action === "createComment" ? this.handleCreateComment() : null}

				<div id="arrow" data-popper-arrow></div>
			</div>
		)
	}
}


export default SelectionMenu;


