import React, { Component } from "react"
import { connect } from "react-redux"

import "./sidenav.css"
import TopicMenu from "../components/console/TopicMenu.js"
import AgoraMenu from "../components/agora/AgoraMenu.js"

class MainPane extends Component {
	componentDidMount() {
		// console.log("mounted MainPane")
	}
	render() {
		// let mainPane = document.querySelector("#sidenav-main-pane")
		// if (this.props.section) {
		// 	mainPane.style = "width: 100px"
		// }
		debugger
		return (
			<div id="sidenav-main-pane">
				{this.props.section === "console" && this.props.topics.length ? <TopicMenu /> : null}
				{this.props.section === "agora" ? <AgoraMenu /> : null}
				<div>HI THERE BUDDY</div>
			</div>

		)
	}
}

const mapStateToProps = state => {
  return {
    topics: state.topics.topics,
  }
}

export default connect(mapStateToProps)(MainPane);