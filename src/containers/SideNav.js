import React, { Component } from "react"
import "./sidenav.css"
import MainPane from "./MainPane.js"
import DetailPane from "./DetailPane.js"


class SideNav extends Component {
	state = {
		open: true,
		section: "console"
	}

	handleTabClick = e => {
		// this.setState({section: e.target.id})
		let sideNav = document.getElementById("side-nav")
		let sectionTabs = document.getElementById("sections-list")

		if (this.state.open === true && this.state.section === e.target.id) {
			sideNav.style = `left: -${sideNav.clientWidth - sectionTabs.clientWidth}px`			
			this.setState({open: !this.state.open})
		} else if (this.state.open === true && this.state.section !== e.target.id) {
			this.setState({section: e.target.id})
		} else if (this.state.open === false) {
			this.setState({section: e.target.id})
			sideNav.style = `left: 0px`
			this.setState({open: !this.state.open})
		}
	}

	render() {
		return (
			<div id="side-nav" >
				<MainPane section={this.state.section}/>
				<DetailPane />
				<div id="sections-list">
					<div id="console" className="section-tab" onClick={this.handleTabClick}>Console</div>
					<div id="agora" className="section-tab" onClick={this.handleTabClick}>Agora</div>
				</div>
			</div>

		)
	}
}



export default SideNav