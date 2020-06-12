import chunk from 'lodash/chunk';
import _ from 'lodash';

import React, { Component } from 'react';


class Home extends Component {
	componentDidMount() {
		let a = []
		for (let i = 0; i < 3; i++) {
			a.push("b")
		}
		console.log(a)

		// let obj = {
		// 	a: [
		// 		{b: "bop"},
		// 		{c: "clop"}
		// 	]
		// }

		// _.set(obj, "a.0.b", "drop")

		// console.log(obj)
	}

	render() {
		return (
			<div id="home-wrapper">
				<h1>Home</h1>
			</div>
		)
	}
}


export default Home;