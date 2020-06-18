import rootURL from "../rootURL.js"

export const addFact = (selection, articleURL) => {
	dispatch({type: "POST_FACT"})

	let configObj = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			Authorization: localStorage.getItem("token")
		},
		body: JSON.stringify({
				"selected_text": clickData.selectionText,
				"selection_url": articleURL			
		})
	}

	fetch("http://localhost:3000/facts", configObj)
		.then(resp => resp.json())
		.then(fact => {
			debugger
			dispatch({
				type: "ADD_FACT",
				fact
			})
		})
		.catch(function(error) {
			alert(error.message);
		})			
}