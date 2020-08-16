import React, { Component } from 'react';

class LandingPage extends Component {
	componentDidMount() {
    let blob = document.querySelector("#blob")
		blob.style.width = "100%"
		blob.style.height = "100%"		
		blob.style.borderRadius = "0px";

		// setTimeout(() => {
		// 	if (!this.props.userId) {
		// 		let app = document.querySelector(".App");
		// 		app.style.backgroundColor = "#0f4c75" 
		// 	}  			
		// }, 500)
	}

	render() { 	
		return (
			<div id="landing-page">HOME</div>
		)
	}
}


export default LandingPage;