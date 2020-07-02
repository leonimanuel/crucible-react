import { API_ROOT, HEADERS } from "../constants"

export const addComment = (groupName, discussionName, comment, span, startOffset, endOffset, previousElId, facts) => {
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
    fetch(API_ROOT + `/groups/${groupName}/discussions/${discussionName}/comments`, configObj)
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
    fetch(API_ROOT + `/facts`, configObj)
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

    fetch(API_ROOT + `/groups/${groupId}/discussions`, configObj)
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

export const addMessageToDiscussion = message => {
  return {
    type: "ADD_MESSAGE_TO_DISCUSSION",
    message
  }
}

export const resetUnreadCount = (response) => {
  return {
    type: "RESET_DISCUSSION_UNREAD_COUNT",
    response
  }
}

export const fetchMessages = (groupId, discussionId) => {
  return (dispatch) => {


    debugger
    console.log(localStorage.getItem("token"))

    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    fetch(`${API_ROOT}/groups/${groupId}/discussions/${discussionId}/messages`, configObj)
      .then(resp => resp.json())
      .then(messages => {
        debugger
        dispatch({
          type: "ADD_MESSAGES_TO_DISCUSSION",
          messages
        });
      })

    let response = {discussion_id: discussionId, unread_messages: 0}
    dispatch({
      type: "RESET_DISCUSSION_UNREAD_COUNT",
      response
    })

    // fetch(`${API_ROOT}/groups/${groupId}/discussions/${discussionId}/messages`, {
    //   method: 'GET',
    //   headers: HEADERS,
    // })
    // .then(resp => resp.json())
    // .then(messages => {
    //   // debugger
    //   dispatch({
    //     type: "ADD_MESSAGES_TO_DISCUSSION",
    //     messages
    //   });
    // })     
  }
}

export const toggleForum = () => {
  return {
    type: "TOGGLE_FORUM"
  }
}



