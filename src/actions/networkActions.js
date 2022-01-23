import { API_ROOT } from "../constants"

export const fetchContacts = (contactType) => {
	return (dispatch) => {
		dispatch({
			type: "FETCHING_CONTACTS"
		})

	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  fetch(API_ROOT + `/contacts/index/${contactType}`, configObj)
	  .then(resp => resp.json())
	  .then(contacts => {
	  	debugger
	  	dispatch({
	  		type: `SET_NETWORK_${contactType.toUpperCase()}`,
	  		contacts: contacts
	  	})
	  })
	  .catch(err => alert(err))
	}
}

export const showSelectedContact = (contactId) => {
	return (dispatch) => {
		dispatch({
			type: "FETCHING_SELECTED_CONTACT"
		})

	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }

	  fetch(API_ROOT + `/contacts/${contactId}`, configObj)
	  .then(resp => resp.json())
	  .then(data => {
	  	dispatch({
	  		type: "SET_SELECTED_CONTACT",
	  		contact: data.contact,
	  		activities: data.feed_items  
	  	})
	  })
	  .catch(err => alert(err))
	}	
}

export const clearSelectedContact = () => {
	return (dispatch) => {
		dispatch({
			type: "CLEAR_SELECTED_CONTACT"
		})	
	}			
}