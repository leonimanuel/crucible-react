import React, { Component } from 'react';
import { connect } from "react-redux"

class Article extends Component {
	render() {
		debugger
		return (
			<div id="groups-wrapper">
				<h3>{this.props.discussion ?this.props.discussion.article.title : null}</h3>
			</div>
		)
	}
}


export default connect(state => ({discussion: state.sidenav.discussion}))(Article);