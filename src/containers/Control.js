import React, { Component } from 'react';
import "./control.css"
import { connect } from "react-redux"
import { Redirect} from "react-router-dom";

import IntelControl from "../components/control/IntelControl.js"

class Control extends Component {
	render() {
    let blob = document.getElementById("blob")
    if (blob) blob.style.display = "none"   		
		return (
			<div id="control-wrapper">
				{this.props.user.email === "leonmalisov@gmail.com"
					?						
						<IntelControl />
					: 
						<Redirect to="/"/>
				}	
			</div>
		)
	}
}

export default connect(state => ({user: state.users.user}))(Control);