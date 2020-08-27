import React, { Component } from 'react';
import { connect } from "react-redux"
import BriefingItem from "../intel/BriefingItem.js"
import BriefingThumbnail from "../intel/BriefingThumbnail.js"
import Claire from "./IMG-4792.JPG"

class BriefingsOverview extends Component {
	state = {
		// i: 0
		briefingPosition: 0,
		colors: ["#162447", "#1f4068", "#84142d", "#00454a", "#404b69", "#0b5269", "#53354a"],
		randomColor: "#84142d",
		showArrows: false
	}

	componentDidMount() {
		const briefingPositionInterval = setInterval(() => {
			this.updateBriefingPosition()
		}, 5000)
		this.setState({ briefingPositionInterval })
	}

	// componentDidUpdate() {
	// 	if (this.props.briefings) {
	// 		const briefingBox = document.getElementById("briefing-slide");
	// 	}
	// }

	componentWillUnmount() {
		clearInterval(this.state.briefingPositionInterval)
	}

	handlePrevSlide = () => {
		console.log(this.state.briefingPosition)
		const { briefingPosition, colors } = this.state;
		clearInterval(this.state.briefingPositionInterval)
		this.setState({
			briefingPosition: (briefingPosition - 1) < 0 ? (this.props.briefings.length - 1) : (briefingPosition - 1),
			randomColor: colors[Math.floor(Math.random() * colors.length)]
		})
	}

	handleNextSlide = () => {
		console.log(this.state.briefingPosition)
		const { briefingPosition, colors } = this.state;
		clearInterval(this.state.briefingPositionInterval)
		this.setState({
			briefingPosition: (briefingPosition + 1) > (this.props.briefings.length - 1) ? 0 : (briefingPosition + 1),
			randomColor: colors[Math.floor(Math.random() * colors.length)]
		})
	}

	updateBriefingPosition = () => {
		console.log(this.state.briefingPosition, this.props.briefings.length)
		const { briefingPosition, colors } = this.state;
		this.setState({
			briefingPosition: briefingPosition  < (this.props.briefings.length - 1) ? (briefingPosition + 1) : 0,
			randomColor: colors[Math.floor(Math.random() * colors.length)]
		})
	}

	showArrows = () => {
		this.setState({showArrows: true})
	}

	hideArrows = () => {
		this.setState({showArrows: false})
	}	

	openBriefing = (briefingURL) => {
		window.open(briefingURL)
	}

	render() {
		const { briefings } = this.props
		const { briefingPosition } = this.state 
		if (briefings, briefingPosition) {
			console.log(briefings.map(b => b.organization))
		}
		return (
			<div id="briefings-overview" className="overview-wrapper" onMouseEnter={this.showArrows} onMouseLeave={this.hideArrows}>
				<div className="overview-header" id="briefings-overview-header" >Intel</div>
				<div className="overview-content-container" id="overview-briefings-container" >
				  {briefings.length ? <BriefingItem briefing={briefings[briefingPosition] ? briefings[briefingPosition] : briefings[0]} onBriefingSelect={this.openBriefing} backgroundColor={this.state.randomColor} class="overview-selected-briefing" id="briefing-slide"/> : null}

				  <div className="prev arrow" id="prev-arrow" onClick={this.handlePrevSlide} style={{opacity: this.state.showArrows ? "1" : "0"}}>&#10094;</div>
				  <div className="next arrow" id="next-arrow" onClick={this.handleNextSlide} style={{opacity: this.state.showArrows ? "1" : "0"}}>&#10095;</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		briefings: state.briefings.allBriefings
	}
}

export default connect(mapStateToProps)(BriefingsOverview);

