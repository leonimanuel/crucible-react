import rootURL from "../rootURL.js"

export const addComment = (groupId, discussionId, comment, span, startOffset, endOffset, previousElId) => {
	console.log(comment)
	// debugger
	return (dispatch) => {
		dispatch({type: "POSTING_COMMENT"})
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
      	comment_text: comment,
				span_id: span.id,
				selection: span.innerText,
				start_offset: startOffset,
				end_offset: endOffset,
				previous_el_id: previousElId
      })
    }
    // debugger
    fetch(rootURL() + `/groups/${groupId}/discussions/${discussionId}/comments`, configObj)
      .then(resp => resp.json())
      .then((comment) => {
				// debugger
				dispatch({ 
					type: 'ADD_COMMENT', 
					comment
				})
     })
      .catch(err => alert(err.message))
	}
}

export const falsifyAddedNewComment = () => {
	return {
		type: "FALSIFY_ADDED_NEW_COMMENT"
	}
}