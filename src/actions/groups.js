import rootURL from "../rootURL.js"

export const loadGroups = (groups) => {
	console.log("loading groups")
	return {
		type: "LOAD_GROUPS",
		groups
	}
}

export const setSelectedGroup = group => {
	console.log("dispatching set details to true")
	return {
		type: "SET_SELECTED_GROUP",
		group
	}
} 

export const fetchDiscussion = (discussion) => {
	return (dispatch) => {
		dispatch({type: "LOADING_DISCUSSION"})
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    fetch(rootURL() + `/groups/${discussion.group_id}/discussions/${discussion.id}`, configObj)
      .then(resp => resp.json())
      .then((data) => {
				console.log(data)
     })
      .catch(err => alert(err.message))
	}
}