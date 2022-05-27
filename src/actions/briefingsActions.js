import { API_ROOT } from "../constants"


export const addBriefings = (briefings) => {
	return {
		type: "ADD_BRIEFINGS",
		briefings
	}
}

export const getArticleRecommendations = () => {
	return dispatch => {
		dispatch({
			type: "FETCHING_ARTICLES"
		})

    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }

    fetch(API_ROOT + "/interests/article_recommendations", configObj)
      .then(resp => resp.json())
      .then(articles => {
        debugger
        dispatch({
        	type: "SET_ARTICLES",
        	articles
        })
      })
      .catch(err => alert(err))
	}
}