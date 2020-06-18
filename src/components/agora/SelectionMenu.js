import React, { Component } from 'react';

class SelectionMenu extends Component {
	render() {
		// const { match } = this.props;
		return (
			<div id={this.props.id}>
				<button>Collect Fact</button>
				<button>Post Comment</button>
				<div id="arrow" data-popper-arrow></div>
			</div>
		)
	}
}


export default SelectionMenu;