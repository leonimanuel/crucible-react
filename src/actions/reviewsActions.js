import { API_ROOT, HEADERS } from "../constants"

export const fetchItemsForReview = () => {
	return (dispatch) => {    
		let factIds = facts.map(fact => fact.id)
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
     })
      .catch(err => alert(err.message))
	}
}