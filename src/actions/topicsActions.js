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


