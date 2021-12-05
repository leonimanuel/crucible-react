import React, { Component } from 'react';

class Pitch extends Component {
	render() {
		debugger
		if (document.getElementById("blob")) {
			const blob = document.getElementById("blob")
			blob.style.display = "none"
		}
		return (
			<div id="pitch-wrapper">
				HOWDY
			</div>
		)
	}
}

export default Pitch;




