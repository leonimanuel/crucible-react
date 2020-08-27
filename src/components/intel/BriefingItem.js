import React, { Component } from 'react';

class BriefingItem extends Component {
	componentDidMount() {
		// const colors = ["#162447", "#1f4068", "#84142d", "#00454a", "#404b69", "#0b5269", "#53354a"]
		// const randomColor = colors[Math.floor(Math.random() * colors.length)]

		// const poster = document.getElementById("briefing-poster-image")	
		// poster.style.backgroundColor = randomColor
	}

	render() {
		const { briefing } = this.props
		return (
			<div className={`briefing-item ${this.props.class}`} id={this.props.id} onClick={() => this.props.onBriefingSelect(briefing.url)}>
				<div id="briefing-poster" >
					<div className="briefing-poster-image" id="briefing-poster-image" style={{"background-color": this.props.backgroundColor}}>
						<div className="briefing-organization">{briefing.organization}</div>
					</div>
					{/*<img className="briefing-poster-image" src="https://i.ibb.co/WGtMN5f/pew-research-center-logo.png" alt=""/>*/}
				</div>
				<div className="briefing-details">
					<div className="briefing-name">{briefing.name}</div>
					<div className="briefing-description">{briefing.description}</div>
					{/*<div className="briefing-organization">{this.props.briefing.organization}</div>*/}
				</div>
			</div>
		)
	}
}

export default (BriefingItem);