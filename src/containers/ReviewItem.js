import React, { Component } from 'react';

class ReviewItem extends Component {
	state = {
		score: 0
	}

	handleVote = (vote) => {
		this.setState({
			score: this.state.score + vote
		})
	}

	render() {
		return (
			<div id="review-item" style={{margin: "10px 0"}}>
				<div>{this.props.item.content}</div>
				<button onClick={() => this.handleVote(1)}>+</button>
				<button onClick={() => this.handleVote(-1)}>-</button>
				<div>score: {this.state.score}</div>				
			</div>
		)
	}
}


export default ReviewItem;