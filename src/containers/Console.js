import React, { Component } from 'react';
import rootURL from "../rootURL.js"
import { connect } from "react-redux"
import ConsoleWindow from "../components/console/ConsoleWindow.js"

class Console extends Component {
	componentDidMount() {
		let configObj = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.getItem("token")
			},
			// body: JSON.stringify({
			// 	token: localStorage.getItem("token")
			// })
		}
		console.log(rootURL() + `/users/${this.props.email}`)
		fetch(rootURL() + `/users/${this.props.email}`, configObj)
			.then(resp => resp.json())
			.then((data) => {
				console.log(data)
			})
	}

	render() {
		return (
			<div id="console-container">
				<ConsoleWindow />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		email: state.userEmail
	}
}


export default connect(mapStateToProps)(Console);




