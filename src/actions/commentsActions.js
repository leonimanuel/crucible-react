import mixpanel from 'mixpanel-browser';
import { StreamChat } from 'stream-chat';
import { API_ROOT, HEADERS } from "../constants";

export const selectComment = (comment, userId) => {
  return dispatch => {
    dispatch({
	    type: "SELECT_COMMENT",
	    comment,
	    userId
    });

	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }
	  fetch(API_ROOT + `/chats/authenticate/${comment.id}`, configObj)
	    .then(resp => resp.json())
	    .then(async (data) => {
	      debugger
	      const commentID = comment.id
	      const userIdString = userId.toString()
	      const commentIdString = commentID.toString()

	      const client = StreamChat.﻿getInstance﻿(﻿﻿"37zxvpg2wqvj")﻿
				await client.﻿connectUser﻿({ id: userIdString}﻿, data.token)
				const channel = client.channel('comment-discussion', commentIdString); 	
				// await channel.addMembers([`${userIdString}`]);			
				const state = await channel.watch(); 
				const messages = state.messages

				// set existing channel messages in state
        const supportedMessages = messages.filter(m => m.comment_id)
        if (supportedMessages.length) {
        	let configObj = { 
        		method: "POST", 
        		headers: HEADERS, 
        		body: JSON.stringify({commentIds: supportedMessages.map(m => m.comment_id)})
        	}

        	fetch(API_ROOT + `/chats/supportify`, configObj)
        		.then(resp => resp.json())
        		.then(comments => {
        			messages.map(m => {
        				if (m.comment_id) {
        					m["comment"] = comments.find(c => c.id == m.comment_id)
        				}
        			})
			        
			        dispatch({ 
			          type: 'SET_MESSAGES', 
			          messages
			        })     
        		})
      			.catch(err => {
      				alert(err.message)
      			})     			

        } else {
	        dispatch({ 
	          type: 'SET_MESSAGES', 
	          messages
	        }) 
        }  

        // watch for new messages
				channel.on(event => { 
			    if (event.type == "message.new") { //if somone sends a new message while watching channel
			    	const message = event.message
			    	if (message.comment_id) {
		        	let configObj = { 
		        		method: "POST", 
		        		headers: HEADERS, 
		        		body: JSON.stringify({commentIds: [message.comment_id]})
		        	}

		        	fetch(API_ROOT + `/chats/supportify`, configObj)
		        		.then(resp => resp.json())
		        		.then(comments => {
		        			message["comment"] = comments[0]
					       
						    	dispatch({
						    		type: "ADD_NEW_MESSAGE",
						    		message
						    	})   
		        		})
		      			.catch(err => {
	alert(err.message)
}) 			    		
			    	} else {
				    	dispatch({
				    		type: "ADD_NEW_MESSAGE",
				    		message
				    	})
			    	}
			    }
				});				
	   })
	    .catch(err => {
	alert(err.message)
})	

  }
}

export const submitPosition = (text, factIDs, responseExcerptId, tags, groupId, clearForm) => {
  return async dispatch => {
  	dispatch({type: "SUBMITTING_POSITION"})

	  let configObj = {
	    method: 'POST',
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    },
	    body: JSON.stringify({
	      comment_type: "position",
	      responseExcerptId: responseExcerptId,
	      text: text,
	      factIds: factIDs,
	      tags: tags,
	      groupId: groupId
	    })
	  }
	  
	  try {
		  let res = await fetch(`${API_ROOT}/comments`, configObj);
		  if (res.status == 201) {
		  	mixpanel.track("Create Post", {
		  		has_comment: !!text,
		  		has_selection: !!responseExcerptId,
		  		supported: !!factIDs.length,
		  		group_id: groupId,
		  		source: "web-app"
		  	})
		  	let newPositionActivity = await res.json()
		  	dispatch({
		  		type: "ADD_NEW_POSITION",
		  		position: newPositionActivity
		  	})

		  	clearForm()
		  }
		  else if (res.status == 422) {
        let response = await res.json()
        alert(response.errors.join('\r\n'))    		  	
		  } 
		  else {
        let error = await res.json()
        alert(`error: ${res.status}, ${error.message}`)
		  }
	  } catch (error) {
	  	alert(error)
	  }
  }
}


















