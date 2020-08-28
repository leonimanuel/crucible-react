import { API_ROOT } from "../constants"

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
    fetch(API_ROOT + `/review`, configObj)
      .then(resp => resp.json())
      .then((itemData) => {				
        debugger
        const itemsObj = itemData
        dispatch({
					type: "ADD_REVIEW_ITEMS",
					itemsObj,
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
        decision: decision,
        subjectId: selectedItem.subject_id
      })
    }
    debugger
    fetch(API_ROOT + `/review`, configObj)
     //  .then(resp => resp.json())
     //  .then((response) => {
     //    const item  = response.item
     //    const dailyReviews  = response.daily_reviews
     //    debugger
     //    dispatch({
     //      type: "RESET_ITEM_UNDER_REVIEW",
     //      item,
     //      dailyReviews
     //    })
     // })
     //  .catch(err => alert(err.message))
  }
}

export const resetItemUnderReview = (response) => {
  if (!response) {
    return {
      type: "SKIP_REVIEW",
    }
  } else {
    return {
      type: "RESET_ITEM_UNDER_REVIEW",
      response
    }    
  }
}

export const updateScore = (vote, itemId) => {
  return {
    type: "UPDATE_ITEM_SCORE",
    vote,
    itemId
  }
}

export const updateAccuracyScore = response => {
  return {
    type: "UPDATE_ACCURACY_SCORE",
    response
  }
}