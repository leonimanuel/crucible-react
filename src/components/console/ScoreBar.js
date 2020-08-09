import React, { Component } from "react";

class ScoreBar extends Component {
	state = {
		mounted: false
	}

	componentDidMount() {
		this.setState({mounted: true})
	}

	render() {
		const scoresTotal = this.props.greenScore + this.props.redScore
		const greenShare = this.props.greenScore / scoresTotal
		const redShare = this.props.redScore / scoresTotal
		const greenWidth = `${greenShare * 100}%`
		const yellowWidth = `${(1 - (greenShare + redShare)) * 100}%`
		const redWidth = `${redShare * 100}%`
		debugger
		return (
			<div className={`score-bar ${this.state.mounted ? "mounted-score-bar" : null}`} >
				<div className="score-color green-score" style={{width: greenWidth}}></div>
				<div className="score-color yellow-score" style={{width: yellowWidth}}></div>
				<div className="score-color red-score" style={{width: redWidth}}></div>
			</div>
		)
	}
}


export default ScoreBar;

// style={{"flex-grow": "1"}}