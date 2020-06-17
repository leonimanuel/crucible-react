import rootURL from "../rootURL.js"

export const addComment = (groupId, discussionId, comment, span, startOffset, endOffset) => {
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
				end_offset: endOffset
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


	// return {
	// 	type: "ADDING_COMMENT",
	// 	comment
	// }
	// return (dispatch) => {
	// 	dispatch({type: "CREATE_COMMENT"})
 //    let configObj = {
 //      method: "POST",
 //      headers: {
 //        "Content-Type": "application/json",
 //        Accept: "application/json",
 //        Authorization: localStorage.getItem("token")
 //      }
 //    }
 //    // debugger
 //    fetch(rootURL() + `/groups/${groupId}/discussions/${discussionId}`, configObj)
 //      .then(resp => resp.json())
 //      .then((discussionData) => {
	// 			dispatch({ 
	// 				type: 'ADD_DISCUSSION', 
	// 				discussionData
	// 			})
 //     })
 //      .catch(err => alert(err.message))
}