import { API_ROOT } from "../constants"

// export const logIn = (user) => {
// 	// debugger
// 	return {
// 		type: "LOG_IN",
// 		user
// 	}
// }

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

    // console.log(store)
    fetch(API_ROOT + `/users/GETUSER`, configObj)
      .then(resp => resp.json())
      .then((user) => {
        if (user.name) {
					dispatch({
						type: "LOG_IN",
						user
					})
        } else {
          console.log("nobody's logged in")
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





