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

export const submitRephrase = (rephraseText, factId) => {
  return (dispatch) => {
	  let configObj = {
	    method: 'POST',
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    },
	    body: JSON.stringify({
	      text: rephraseText
	    })
	  }

	  fetch(`${API_ROOT}/facts/${factId}/rephrases`, configObj)
	  	.then(resp => resp.json())
	  	.then(fact => {
	  		debugger
	  		dispatch({
	  			type: "ADD_REPHRASE",
					fact
	  		})
	  	}) 	
  }
}

export const removeFact = (fact) => {
  return async (dispatch) => {
	  let configObj = {
	    method: 'DELETE',
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  try {
		  let resp = await fetch(`${API_ROOT}/facts/${fact.id}?topic_id=${fact.topic_id}`, configObj);
		  if (resp.status == 204) {
	  		dispatch({
	  			type: "REMOVE_FACT",
					factId: fact.id
	  		})
		  }
			else {
				let res = await resp.json()
				alert(`${res.message}, code: ${resp.status}`)
			}  	
	  } catch (error) {
	  	alert(error)
	  }
  }
}




