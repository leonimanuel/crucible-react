import { API_ROOT } from "../constants"

export const logIn = () => {
	return async (dispatch) => {
    let configObj = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }
    }
    try {
      let resp = await fetch(API_ROOT + `/users/GETUSER`, configObj)
      if (resp.status == 200) {
        let data = await resp.json()
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

          let discussions = user.discussions
          dispatch({
            type: "ADD_DISCUSSIONS",
            discussions
          })
        
          // const itemsObj = data.review
          // dispatch({
          //   type: "ADD_REVIEW_ITEMS",
          //   itemsObj
          // })

          const briefings = user.briefings
          dispatch({
            type: "ADD_BRIEFINGS",
            briefings
          })

          if (data.notifications) {
            dispatch({
              type: "SET_NOTIFICATIONS",
              notifications: data.notifications
            })        
          }  
        } else {
          dispatch({type: "LOGIN_FAILED"})
        }
      } 
    } catch (error) {
      alert(error)
    }

	}
}

export const updateUserProfile = (user, closeModal) => {
  return async (dispatch) => {
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: localStorage.getItem("token")
      }, body: JSON.stringify({
        name: user.name,
        handle: user.handle,
        email: user.email
      })
    }

    try {
      let res = await fetch(API_ROOT + `/users/${user.id}`, configObj)
      if (res.status == 200) {
        dispatch(({
          type: "UPDATE_USER",
          user: user
        }))

        closeModal()
      } else {
        alert("can't update profile")
      }
    } catch (error) {
      alert(error + "can't update profile")
    }
  }

}

export const logOut = () => {
	return {
		type: "LOG_OUT"		
	}
}

export const resetQuotas = () => {
  return {
    type: "RESET_QUOTAS"
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





