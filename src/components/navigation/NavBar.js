import React, { Component } from 'react';


class NavBar extends Component {
	redirect = (destination) => {
		console.log(destination)
	}

	render() {
		return (
			<div id="nav-wrapper">
				<div onClick={() => this.redirect("/home")}>Home</div>
				<div onClick={() => this.redirect("/console")}>Console</div>
				<div onClick={() => this.redirect("/review")}>Review</div>
				<div onClick={() => this.redirect("/groups")}>Groups</div>				
			</div>
		)
	}
}


export default NavBar;