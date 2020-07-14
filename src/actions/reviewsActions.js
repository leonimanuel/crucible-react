import { API_ROOT, HEADERS } from "../constants"

export const fetchItemsForReview = () => {
	return (dispatch) => {    
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    // debugger
    fetch(API_ROOT + `/review`, configObj)
      .then(resp => resp.json())
      .then((items) => {
				debugger
				
        const facts = items.facts
        dispatch({
					type: "ADD_REVIEW_FACTS",
					facts
				})
     })
      .catch(err => alert(err.message))
	}
}

export const submitDecision = (factId, questionType, decision) => {
  return dispatch => {
    debugger
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        factId: factId,
        questionType: questionType,
        decision: decision
      })
    }
    // debugger
    fetch(API_ROOT + `/review`, configObj)
      .then(resp => resp.json())
      .then((items) => {
        debugger
     })
      .catch(err => alert(err.message))
  }
}