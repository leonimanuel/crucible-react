import React, { Component } from 'react';
import "../components/console/console.css"

import rootURL from "../rootURL.js"
import { connect } from "react-redux"
import ConsoleWindow from "../components/console/ConsoleWindow.js"

class Console extends Component {
    componentDidMount() {
	  	console.log("Console did mount")
	    let configObj = {
	      method: "GET",
	      headers: {
	        "Content-Type": "application/json",
	        Accept: "application/json",
	        Authorization: localStorage.getItem("token")
	      }
	    }

	    // console.log("OY")
	    fetch(rootURL() + `/topics`, configObj)
	      .then(resp => resp.json())
	      .then((data) => {
					console.log(data)
	      })
	      .catch(err => err.message)
    } 


	render() {
		// this.fetchFacts()
		return (
			<div id="console-container">
				<ConsoleWindow />
			</div>
		)
	}
}

export default connect()(Console);




