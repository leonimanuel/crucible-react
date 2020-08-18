import { API_ROOT } from "../constants"

export const logIn = () => {
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
    fetch(API_ROOT + `/users/GETUSER`, configObj)
      .then(resp => resp.json())
      .then((data) => {
        const user = data.user
        if (user) {
					dispatch({
						type: "LOG_IN",
						user
					});
          
          let facts = user.facts
          dispatch({
            type: "LOAD_FACTS",
            facts
          })

          let groups = user.groups
          let groupMembers = user.group_members
          // debugger
          dispatch({
            type: "LOAD_GROUPS",
            groups,
            groupMembers
          })

          let discussions = user.discussions
          dispatch({
            type: "ADD_DISCUSSIONS",
            discussions
          })

          let members = user.group_members
          dispatch({
            type: "ADD_GROUP_MEMBERS",
            members
          })
        
          const itemsObj = data.review
          dispatch({
            type: "ADD_REVIEW_ITEMS",
            itemsObj
          })

          const briefings = user.briefings
          dispatch({
            type: "ADD_BRIEFINGS",
            briefings
          })
        } else {
          dispatch({type: "LOGIN_FAILED"})
        }
      })
	}
}

export const logOut = () => {
	return {
		type: "LOG_OUT"		
	}
}


// export const addTopics = (topics) => {
// 	return {
// 		type: "ADD_TOPICS",
// 		topics
// 	}
// }




// export const showGroupDetails = group => {
// 	console.log("dispatching showGroupDetails")
// 	return {
// 		type: "SHOW_GROUP_DETAILS",
// 		group
// 	}
// }





