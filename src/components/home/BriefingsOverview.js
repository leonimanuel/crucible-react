import React, { Component } from 'react';
import { connect } from "react-redux"
import BriefingItem from "../intel/BriefingItem.js"
import BriefingThumbnail from "../intel/BriefingThumbnail.js"
import Claire from "./IMG-4792.JPG"

class BriefingsOverview extends Component {
	state = {
		// i: 0
		briefingPosition: 0,
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
		const { briefingPosition } = this.state;
		clearInterval(this.state.briefingPositionInterval)
		this.setState({briefingPosition: (briefingPosition - 1) < 0 ? (this.props.briefings.length - 1) : (briefingPosition - 1)})
	}

	handleNextSlide = () => {
		console.log(this.state.briefingPosition)
		const { briefingPosition } = this.state;
		clearInterval(this.state.briefingPositionInterval)
		this.setState({briefingPosition: (briefingPosition + 1) > (this.props.briefings.length - 1) ? 0 : (briefingPosition + 1)})
	}

	updateBriefingPosition = () => {
		console.log(this.state.briefingPosition, this.props.briefings.length)
		const { briefingPosition } = this.state;
		this.setState({briefingPosition: briefingPosition  < (this.props.briefings.length - 1) ? (briefingPosition + 1) : 0})
	}

	showArrows = () => {
		this.setState({showArrows: true})
	}

	hideArrows = () => {
		this.setState({showArrows: false})
	}	

	render() {
		const { briefings } = this.props
		const { briefingPosition } = this.state 
		if (briefings, briefingPosition) {
			console.log(briefingPosition, briefings[briefingPosition].name)
		} 
		return (
			<div id="briefings-overview" className="overview-wrapper" onMouseEnter={this.showArrows} onMouseLeave={this.hideArrows}>
				<div className="overview-header" id="briefings-overview-header" >Intel</div>
				<div className="overview-content-container" id="overview-briefings-container" >
				  {briefings.length ? <BriefingItem briefing={briefings[briefingPosition] ? briefings[briefingPosition] : briefings[0]} class="overview-selected-briefing" id="briefing-slide"/> : null}

				  <div className="prev arrow" id="prev-arrow" onClick={this.handlePrevSlide} style={{opacity: this.state.showArrows ? "1" : "0"}}>&#10094;</div>
				  <div className="next arrow" id="next-arrow" onClick={this.handleNextSlide} style={{opacity: this.state.showArrows ? "1" : "0"}}>&#10095;</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	function shuffle(array) {
	  var currentIndex = array.length, temporaryValue, randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}	
	return {
		briefings: shuffle(state.briefings.allBriefings)
	}
}

export default connect(mapStateToProps)(BriefingsOverview);

