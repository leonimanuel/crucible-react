import React, { Component } from "react"
import { connect } from "react-redux"

import "./sidenav.scss"
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
		return (
			<div id="sidenav-main-pane">
				<div id="console" className={`section-tab ${this.props.section === "console" ? "selected-section" : "unselected-section"}`} onClick={this.props.tabClick}>Facts</div>
				{this.props.section === "console" && this.props.topics.length ? <TopicMenu /> : null}
				
				<div id="activity" className={`section-tab ${this.props.section === "activity" ? "selected-section" : "unselected-section"}`} onClick={this.props.tabClick}>Activity</div>

				{/*this.props.section === "agora" ? <AgoraMenu /> : null*/}
				
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