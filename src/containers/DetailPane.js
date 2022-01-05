import React, { Component } from "react"
import { connect } from "react-redux"

import "./sidenav.scss"
import GroupDetailsMenu from "../components/agora/GroupDetailsMenu.js"
import ConsoleWindow from "../components/console/ConsoleWindow.js"

class DetailPane extends Component {
	render() {
		let detailPane = document.querySelector("#sidenav-details-pane")
		if (detailPane) {
			if ((this.props.selectedGroupId && this.props.section === "agora") || 
				(this.props.parentTopic && this.props.section === "console")) {
				// detailPane.style = "width: 200px"
			} else {
				// detailPane.style = "width: 0px"
			}			
		}
		return (
			<div id="sidenav-details-pane">
				{this.props.section === "console" && this.props.parentTopic ? <ConsoleWindow /> : null}
				{this.props.section === "agora" && this.props.selectedGroupId ? <GroupDetailsMenu /> : null}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		selectedGroupId: state.groups.selectedGroupId,
		parentTopic: state.topics.parentTopic,
		// showDetailPane: state.sidenav.showDetailPane
	}
}

export default connect(mapStateToProps)(DetailPane)

				// {this.props.section === "console" ? <ConsoleWindow /> : null}