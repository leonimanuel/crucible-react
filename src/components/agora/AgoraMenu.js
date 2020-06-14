import React, { Component } from 'react';
import { connect } from "react-redux"
// import ConsoleTopic from "./ConsoleTopic.js"
import GroupsList from "./GroupsList.js"

class AgoraMenu extends Component {
	render() {
		return (
			<div id="agora-menu">
				<div className="">Agora</div>
				<div id="groups-list">
					{this.props.groups ? <GroupsList groups={this.props.groups}/> : null} 
				</div>
			</div>
		)
	}
}


export default connect()(AgoraMenu);




