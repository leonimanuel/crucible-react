import React, { Component } from "react"
import "./sidenav.css"
import TopicMenu from "../components/console/TopicMenu.js"
import AgoraMenu from "../components/agora/AgoraMenu.js"

class MainPane extends Component {
	componentDidMount() {
		console.log("mounted MainPane")
	}
	render() {
		return (
			<div>
				{this.props.section === "console" ? <TopicMenu /> : null}
				{this.props.section === "agora" ? <AgoraMenu /> : null}
			</div>

		)
	}
}


export default MainPane