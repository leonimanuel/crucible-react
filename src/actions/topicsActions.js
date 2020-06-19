import rootURL from "../rootURL.js"


export const fetchTopics = () => {
	return (dispatch) => {
		dispatch({type: "GETTING_TOPICS"})
	  let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  fetch(rootURL() + `/topics`, configObj)
	    .then(resp => resp.json())
	    .then((topics) => {
				// debugger
				dispatch(({
					type: "ADD_TOPICS",
					topics
				}))
				// this.props.addTopics(data)
	    })
	    .catch(err => err.message)
	}
}

export const selectTopic = topic => {
	return {
		type: "SELECT_TOPIC",
		topic
	}
}

export const updateTopic = (fact, destinationTopic) => {
	// debugger
	console.log(fact)
	return {
		type: "UPDATE_TOPIC",
		fact,
		destinationTopic
	}
}

export const addFactToNew = (selection, articleURL) => {

	return (dispatch) => {
		dispatch({type: "POST_FACT"})
		let configObj = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.getItem("token")
			},
			body: JSON.stringify({
					"selected_text": selection,
					"selection_url": articleURL			
			})
		}
		// debugger
		fetch("http://localhost:3000/facts", configObj)
			.then(resp => resp.json())
			.then(fact => {
				// debugger
				dispatch({
					type: "ADD_FACT",
					fact
				})
			})
			.catch(function(error) {
				alert(error.message);
			})			
	}
}

