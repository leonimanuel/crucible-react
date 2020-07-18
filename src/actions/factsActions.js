import { API_ROOT } from "../constants"

// export const addFact = (selection, articleURL) => {
// 	return dispatch => {
// 		dispatch({type: "POST_FACT"})
// 		let configObj = {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 				Accept: "application/json",
// 				Authorization: localStorage.getItem("token")
// 			},
// 			body: JSON.stringify({
// 					"selected_text": clickData.selectionText,
// 					"selection_url": articleURL			
// 			})
// 		}

// 		fetch(API_ROOT + "/facts", configObj)
// 			.then(resp => resp.json())
// 			.then(fact => {
// 				debugger
// 				dispatch({
// 					type: "ADD_FACT",
// 					fact
// 				})
// 			})
// 			.catch(function(error) {
// 				alert(error.message);
// 			})	
// 	}		
// }

export const submitRephrase = (rephraseText) => {
  return (dispatch) => {
	  debugger
	  let configObj = {
	    method: 'POST',
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    },
	    body: JSON.stringify({
	      text: rephraseText,
	    })
	  }

	  fetch(`${API_ROOT}/facts/rephrases`, configObj)
	  	.then(resp => resp.json())
	  	.then(rephrase => {
	  		dispatch({
	  			type: "ADD_REPHRASE",
					rephrase
	  		})
	  	}) 	
  }
}




