import { API_ROOT } from "../constants"

export const addComment = (groupName, discussionName, comment, span, startOffset, endOffset, previousElId, facts) => {
  console.log(comment)
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
    //   .then(resp => resp.json())
    //   .then((comment) => {
        // dispatch({ 
        //  type: 'ADD_COMMENT', 
        //  comment
        // })
    //  })
    //   .catch(err => alert(err.message))
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
    // debugger
    fetch(API_ROOT + `/groups/${groupId}/discussions`, configObj)
      .then(resp => {
        if (!resp.ok) {
          // throw new Error("SOMETHING WENT WRONG")
          dispatch({type: "ADD_DISCUSSION_FAIL"})
          alert("something went wrong, please try again later")
        } else {
          return resp.json()
        }        
      })
      .then((discussion) => {
        if (discussion) {
          dispatch({ 
            type: 'ADD_NEW_DISCUSSION', 
            discussion
          })    
        }
      })
      .catch(err => {
        // alert(err.message)
        debugger
        dispatch({type: "ADD_DISCUSSION_FAIL"})
        alert("something went wrong, please try again later")
      })
  }
}

export const addMessageToDiscussion = message => {
  return {
    type: "ADD_MESSAGE_TO_DISCUSSION",
    message
  }
}

export const addCommentToDiscussion = comment => {
  return {
    type: "ADD_COMMENT_TO_DISCUSSION",
    comment
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

export const toggleForum = (bool) => {
  return {
    type: "TOGGLE_FORUM",
    bool
  }
}

export const truthifyCommentsRendered = () => {
  return {
    type: "SET_COMMENTS_RENDERED_TO_TRUE"
  }
}

export const fetchInterests = () => {
  return dispatch => {
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    fetch(`${API_ROOT}/interests`, configObj)
      .then(resp => resp.json())
      .then(interests => {
        // debugger
        dispatch({
          type: "LOAD_INTERESTS",
          interests
        });
      })    
    }
}

export const updateSelectedInterests = (interest) => {
  return dispatch => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    fetch(`${API_ROOT}/interests/${interest.id}`, configObj)
      .then(resp => resp.json())
      .then(interests => {
        // debugger
        dispatch({
          type: "UPDATE_SELECTED_INTERESTS",
          interests
        });
      })    
    }
}

export const addGuests = (discussion, addedMembers) => {
  return (dispatch) => {
    let memberIds = addedMembers.map(member => member.id)

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        memberIds: memberIds
      })
    }
    debugger
    fetch(API_ROOT + `/groups/${discussion.group_id}/discussions/${discussion.id}`, configObj)
      .then(resp => resp.json())
      .then((discussion) => {
        debugger
        dispatch({ 
          type: 'ADD_GUESTS', 
          discussion
        })
     })
      .catch(err => alert(err.message))
  }
}

export const zeroUnreadCount = (groupId, discussionId) => {
  return dispatch => {
    let configObj = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    fetch(`${API_ROOT}/groups/${groupId}/discussions/${discussionId}/unread-messages-count`, configObj)
      // .then(resp => resp.json())
      // .then(response => {
      //   dispatch({
      //     type: "ZERO_UNREAD_COUNT",
      //     response
      //   })
      // })
  }
}



