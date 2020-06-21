import React, { Component } from "react"
import "./sidenav.css"
import TopicMenu from "../components/console/TopicMenu.js"
import AgoraMenu from "../components/agora/AgoraMenu.js"

class MainPane extends Component {
	componentDidMount() {
		console.log("mounted MainPane")
	}
	render() {
		let mainPane = document.querySelector("#sidenav-main-pane")
		if (this.props.section) {
			mainPane.style = "width: 100px"
		}

		return (
			<div id="sidenav-main-pane">
				{this.props.section === "console" ? <TopicMenu /> : null}
				{this.props.section === "agora" ? <AgoraMenu /> : null}
			</div>

		)
	}
}


export default MainPane