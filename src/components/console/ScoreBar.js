import React, { Component } from "react";

class ScoreBar extends Component {
	render() {
		debugger
		const greenWidth = `${this.props.greenScore * 10}%`
		const yellowWidth = `${(10 - (this.props.greenScore + this.props.redScore)) * 10}%`
		const redWidth = `${this.props.redScore * 10}%`
		return (
			<div className="score-bar">
				<div className="score-color green-score" style={{width: greenWidth}}></div>
				<div className="score-color yellow-score" style={{width: yellowWidth}}></div>
				<div className="score-color red-score" style={{width: redWidth}}></div>
			</div>
		)
	}
}


export default ScoreBar;