import React, { Component } from "react"
import "./sidenav.css"
import MainPane from "./MainPane.js"
import DetailPane from "./DetailPane.js"

class SideNav extends Component {
	render() {
		return (
			<div id="side-nav">
				<MainPane />
				<DetailPane />				
			</div>

		)
	}
}



export default SideNav