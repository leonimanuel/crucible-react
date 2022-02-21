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
				<div id="console" className={`section-tab ${this.props.section === "console" ? "selected-section" : "unselected-section"}`} onClick={this.props.tabClick}
				>
					Facts 
				</div>
				{<TopicMenu display={this.props.section === "console" && this.props.topics.length ? true : false} />}
				
				<div 
					id="notifications" 
					className={`section-tab ${this.props.section === "notifications" ? "selected-section" : "unselected-section"}`} 
					onClick={this.props.tabClick}
					>
						Notifications {this.props.unreadNotificationsCount ? <div className="sidenav-badge topic-badge badge">{this.props.unreadNotificationsCount}</div> : null}
				</div>

				<div 
					id="network" 
					className={`section-tab ${this.props.section === "network" ? "selected-section" : "unselected-section"}`} 
					onClick={this.props.tabClick}
					>
						Network
				</div>				

				{/*this.props.section === "agora" ? <AgoraMenu /> : null*/}
				
			</div>

		)
	}
}

const mapStateToProps = state => {
  return {
    topics: state.topics.topics,
    unreadNotificationsCount: state.notifications.unreadNotificationsCount
  }
}

export default connect(mapStateToProps)(MainPane);




