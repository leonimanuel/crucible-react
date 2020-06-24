import rootURL from "../rootURL.js"

export const addComment = (groupId, discussionId, comment, span, startOffset, endOffset, previousElId, facts) => {
	console.log(comment)
	debugger
	return (dispatch) => {
		dispatch({type: "POSTING_COMMENT"})
    
		let factIds = facts.map(fact => fact.id)
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
				previous_el_id: previousElId,
				factIds: factIds
      })
    }
    // debugger
    fetch(rootURL() + `/groups/${groupId}/discussions/${discussionId}/comments`, configObj)
      .then(resp => resp.json())
      .then((comment) => {
				debugger
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

export const addFactFromComment = (fact) => {
	return (dispatch) => {
		dispatch({type: "ADDING_COMMENT_FACT"})

   let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
      	factId: fact.id
      })
    }
    // debugger
    fetch(rootURL() + `/facts`, configObj)
      .then(resp => resp.json())
      .then((fact) => {
				if (fact.error) {
					alert(fact.error)
				} else {
					dispatch({ 
						type: 'ADD_FACT', 
						fact
					})		
				}
     })
      .catch(err => alert(err.message))
		//POST FACT
	}
}

export const addNewDiscussion = (groupId, articleURL) => {
	return (dispatch) => {
		dispatch({type: "ADDING_NEW_DISCUSSION"})

   let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
      	articleURL: articleURL
      })
    }

    fetch(rootURL() + `/groups/${groupId}/discussions`, configObj)
      .then(resp => resp.json())
      .then((discussion) => {
				if (discussion.error) {
					alert(discussion.error)
				} else {
					dispatch({ 
						type: 'UPDATE_GROUP_DISCUSSIONS', 
						discussion
					})		
				}
     })
      .catch(err => alert(err.message))
	}
}