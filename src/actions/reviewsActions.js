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
      .then((itemData) => {				
        const itemsObj = itemData
        // debugger
        dispatch({
					type: "ADD_REVIEW_ITEMS",
					itemsObj
				})
     })
      .catch(err => alert(err.message))
	}
}

export const submitDecision = (selectedItem, questionType, decision) => {
  return dispatch => {
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify({
        itemType: selectedItem.type,
        itemId: selectedItem.id,
        reviewType: questionType,
        decision: decision
      })
    }
    // debugger
    fetch(API_ROOT + `/review`, configObj)
      .then(resp => resp.json())
      .then((response) => {
        const item  = response.item
        dispatch({
          type: "RESET_ITEM_UNDER_REVIEW",
          item
        })
     })
      .catch(err => alert(err.message))
  }
}

export const updateScore = (vote, itemId) => {
  return {
    type: "UPDATE_ITEM_SCORE",
    vote,
    itemId
  }
}