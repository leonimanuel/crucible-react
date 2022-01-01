import { StreamChat } from 'stream-chat';
import { API_ROOT } from "../constants";

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
				channel.on(event => { 
			    if (event.type == "message.new") {
			    	dispatch({
			    		type: "ADD_NEW_MESSAGE",
			    		event
			    	})
			    }
				});

        dispatch({ 
          type: 'SET_MESSAGES', 
          messages
        })   				
	   })
	    .catch(err => alert(err.message))	

  }
}