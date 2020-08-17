import React, { Component } from "react";

class ScoreBar extends Component {
	state = {
		mounted: false
	}

	componentDidMount() {
		this.setState({mounted: true})
	}

	render() {
		let greenWidth
		let yellowWidth
		let redWidth		

		if (this.props.type === "total") {
			let scoresTotal = this.props.greenScore + this.props.redScore
			let greenShare = this.props.greenScore / scoresTotal
			let redShare = this.props.redScore / scoresTotal
			 greenWidth = `${greenShare * 100}%`
			 yellowWidth = `${(1 - (greenShare + redShare)) * 100}%`
			 redWidth = `${redShare * 100}%`			
		} 
		else if (this.props.type === "individual") {
			 greenWidth = `${this.props.greenScore * 10}%`
			 yellowWidth = `${(10 - (this.props.greenScore + this.props.redScore)) * 10}%`
			 redWidth = `${this.props.redScore * 10}%`
		}

		return (
			<div id={this.props.id} className={`score-bar ${this.state.mounted ? "mounted-score-bar" : null}`} >
				<div className="score-color green-score" style={{width: greenWidth}}></div>
				<div className="score-color yellow-score" style={{width: yellowWidth}}></div>
				<div className="score-color red-score" style={{width: redWidth}}></div>
			</div>
		)
	}
}


export default ScoreBar;

// style={{"flex-grow": "1"}}