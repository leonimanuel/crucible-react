import React, { Component } from 'react';

class SelectionMenu extends Component {
	state = {
		action: ""
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
				<form onSubmit={this.props.submit} id="new-comment-form">
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