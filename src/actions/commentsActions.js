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
        			debugger
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
      			.catch(err => alert(err.message))     			

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
		      			.catch(err => alert(err.message)) 			    		
			    	} else {
				    	dispatch({
				    		type: "ADD_NEW_MESSAGE",
				    		event
				    	})
			    	}
			    }
				});				
	   })
	    .catch(err => alert(err.message))	

  }
}