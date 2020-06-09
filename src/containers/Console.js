import React, { Component } from 'react';
import rootURL from "../rootURL.js"

class Console extends Component {
	componentDidMount() {
		let configObj = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json"
			},
			body: JSON.stringify({
				token: localStorage.getItem("token")
			})
		}
		console.log(rootURL())
		// fetch(rootURL() + `/users/${}`, configObj)
	}

	render() {
		return (
			<div id="console-wrapper">
				<h1>Console</h1>
			</div>
		)
	}
}

export default Console;