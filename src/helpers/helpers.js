export const generateContext = (excerpt) => {
	debugger
	excerpt["content"] = excerpt.content || excerpt.selection
  if (excerpt.node_text) {
		return excerpt.node_text.replace(excerpt.content, `<span class="timeline-excerpt-highlight">${excerpt.content}</span>`)
  }
  return excerpt.content
}

export const handleArticleClick = (e, resource) => {
  e.preventDefault()
  // window.open(resource.article_url + `?crucibleShareId=${resource.id}`,'_blank')
  window.open(resource.article_url + `?crucibleShareId=${resource.id}`,'_blank')
}  