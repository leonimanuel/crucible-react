import React, { Component } from "react"
import { connect } from "react-redux"

import "./sidenav.scss"
import GroupDetailsMenu from "../components/agora/GroupDetailsMenu.js"
import NotificationDetailsMenu from "../components/notifications/NotificationDetailsMenu.js"
import ConsoleWindow from "../components/console/ConsoleWindow.js"
import NetworkMenu from "../components/network/NetworkMenu.js"
import Groups from "./Groups.js"
// import GroupsList from "../components/agora/GroupsList.js"
import GroupsMenu from "../components/groups/GroupsMenu.js"


class DetailPane extends Component {
	render() {
		// let detailPane = document.querySelector("#sidenav-details-pane")
		// if (detailPane) {
		// 	if ((this.props.selectedGroupId && this.props.section === "agora") || 
		// 		(this.props.parentTopic && this.props.section === "console")) {
		// 		// detailPane.style = "width: 200px"
		// 	} else {
		// 		// detailPane.style = "width: 0px"
		// 	}			
		// }
		return (
			<div id="sidenav-details-pane">
				{this.props.section === "console" ? <ConsoleWindow /> : null}
				{this.props.section === "notifications" ? <NotificationDetailsMenu /> : null}
				{this.props.section === "network" ? <NetworkMenu /> : null}
				{this.props.section === "groups" ? <GroupsMenu /> : null}
				{/*this.props.section === "agora" && this.props.selectedGroupId ? <GroupDetailsMenu /> : null*/}
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