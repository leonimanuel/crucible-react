import React, { Component } from "react"
import { connect } from "react-redux"
import { fetchTopics } from "../actions/topicsActions.js" 

import "./sidenav.css"
import MainPane from "./MainPane.js"
import DetailPane from "./DetailPane.js"
// import { hideDetailPane } from "../actions/sidenavActions.js"

class SideNav extends Component {
	state = {
		open: false,
		section: "",
		// renderDetailPane: false
	}

	componentDidMount() {
		// debugger

		// console.log("mounted sidenav")
		let sideNav = document.getElementById("side-nav")
		let sectionTabs = document.getElementById("sections-list")
		sideNav.style = `left: -${sideNav.clientWidth - sectionTabs.clientWidth}px`
	}

	handleTabClick = e => {
		// this.setState({section: e.target.id})
		if (this.state.section !== e.target.id) {
			this.props.fetchTopics()
		}
		

		let sideNav = document.getElementById("side-nav")
		let sectionTabs = document.getElementById("sections-list")

		if (this.state.open === true && this.state.section === e.target.id) {
			sideNav.style = `left: -${sideNav.clientWidth - sectionTabs.clientWidth}px`			
			this.setState({open: !this.state.open})
		} else if (this.state.open === true && this.state.section !== e.target.id) {
			// debugger
			this.setState({section: e.target.id,})
		} else if (this.state.open === false) {
			this.setState({section: e.target.id})
			sideNav.style = `left: 0px`
			this.setState({open: !this.state.open})
		}
	}

	calculateTotalUnreads = () => {
		let reducer = (accumulator, currentValue) => accumulator + currentValue
		let unreadsArray = this.props.discussions.map(d => d.unread_messages_count)
		const totalUnreads = unreadsArray.reduce(reducer, 0)
		return totalUnreads ? <div className="badge section-tab-badge">{totalUnreads}</div> : null	}

	render() {
		// debugger
		return (
			<div id="side-nav" >
				<MainPane section={this.state.section}/>
				<DetailPane section={this.state.section} /> 
				
				<div id="sections-list">
					<div id="console" className={`section-tab ${this.state.section === "console" ? "selected-section" : "unselected-section"}`} onClick={this.handleTabClick}>Console</div>
					<div>
						<div 
							id="agora" 
							className={`section-tab ${this.state.section === "agora" ? "selected-section" : "unselected-section"}`} 
							onClick={this.handleTabClick} 
						>
							Agora
							{this.calculateTotalUnreads()}
						</div>					
						
					</div>
				</div>
			</div>

		)
	}
}

const mapStateToProps = state => {
	// debugger
	return {
		discussions: state.discussions.allDiscussions,
		// unreadMessageCount: state.groups.map
		// selectedGroup: state.sidenav.selectedGroup,
		// parentTopic: state.topics.parentTopic,
		// unreadMessages: state.groups.unreadMessages,
		showDetailPane: state.sidenav.showDetailPane
	}
}


export default connect(mapStateToProps, { fetchTopics })(SideNav)


