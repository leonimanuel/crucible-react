import React, { Component } from 'react';

class ScoreOverviewHelper extends Component {

	render() {
		return (
			<div className="popup helper-popup overview-helper" id={this.props.id}>
				<div style={{"font-size": "1.2em", "font-weight": "bold", "margin-top": "10px"}}>Reach</div>
				<div><span style={{"font-weight": "bold", "text-decoration": "underline"}}>Daily Streak: </span>Add toward your daily reach streak with every fact you use to support a comment in a discussion</div>

				<div style={{"font-size": "1.2em", "font-weight": "bold", "margin-top": "10px"}}>Reputability</div>
				<div><span style={{"font-weight": "bold", "text-decoration": "underline"}}>Accuracy: </span>This is an overall measure of how well all of your facts and comments have done under peer review</div>

				<div style={{"font-size": "1.2em", "font-weight": "bold", "margin-top": "10px"}}>Reviews</div>
				<div><span style={{"font-weight": "bold", "text-decoration": "underline"}}>Daily Streak: </span>Add toward your daily review streak with every review decision you make</div>
				<div><span style={{"font-weight": "bold", "text-decoration": "underline"}}>Total Score: </span>Earn points for every review decision</div>
			</div>
		)
	}
}

export default (ScoreOverviewHelper);