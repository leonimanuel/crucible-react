import React, { Component } from 'react';
import "./control.css"

import IntelControl from "../components/control/IntelControl.js"

class Control extends Component {

	render() {
    let blob = document.getElementById("blob")
    if (blob) blob.style.display = "none"   		
		return (
			<div id="control-wrapper">
				<IntelControl />
			</div>
		)
	}
}

export default Control;