import React from 'react';

const Reply = (props) => {
	return (
		<div className="reply-container">
			{props.reply.content}
		</div>
	)
}

export default Reply;