import React, { Component } from 'react';
import rootURL from "../rootURL.js"
import { connect } from "react-redux"

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
		// console.log(this.props.email)
		// fetch(rootURL() + `/users/`, configObj)
	}

	render() {
		return (
			<div id="console-wrapper">
				<h1>Console</h1>
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




