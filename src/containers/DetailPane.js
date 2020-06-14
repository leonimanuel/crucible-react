import React, { Component } from "react"
import "./sidenav.css"
import GroupDetailsMenu from "../components/agora/GroupDetailsMenu.js"

class DetailPane extends Component {
	render() {
		return (
			// <div id="detail-pane">DETAIL PANE</div>
			<div id="sidenav-details-pane">
				{this.props.section === "agora" ? <GroupDetailsMenu /> : null}
			</div>
		)
	}
}



export default DetailPane

				// {this.props.section === "console" ? <ConsoleWindow /> : null}