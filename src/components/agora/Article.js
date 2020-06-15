import React, { Component } from 'react';
import { connect } from "react-redux"

class Article extends Component {
	render() {
		// debugger
		return (
			<div id="article-wrapper">
				ARTICLEBOI
			</div>
		)
	}
}


export default connect(state => ({discussion: state.sidenav.discussion}))(Article);

				// <h3>{this.props.discussion ?this.props.discussion.article.title : null}</h3>