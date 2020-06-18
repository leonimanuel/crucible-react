import React, { Component } from "react"
import "./sidenav.css"
import GroupDetailsMenu from "../components/agora/GroupDetailsMenu.js"
import ConsoleWindow from "../components/console/ConsoleWindow.js"

class DetailPane extends Component {
	render() {
		// console.log("rendering DetailPane")
		return (
			<div id="sidenav-details-pane">
				{this.props.section === "console" ? <ConsoleWindow /> : null}
				{this.props.section === "agora" ? <GroupDetailsMenu /> : null}
			</div>
		)
	}
}



export default DetailPane

				// {this.props.section === "console" ? <ConsoleWindow /> : null}