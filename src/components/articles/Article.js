import React from 'react';

const ArticlesContainer = (props) => {
	const { article } = props
	return (
		<li className="article-wrapper" onClick={() => window.open(article.url, '_blank').focus()}>
			{article.title}
		</li>
		
	)
}

export default ArticlesContainer;