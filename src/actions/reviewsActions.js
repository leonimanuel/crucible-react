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
    debugger
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
      .then((items) => {
        // debugger
        dispatch({
          type: "RESET_ITEM_UNDER_REVIEW"
        })
     })
      .catch(err => alert(err.message))
  }
}