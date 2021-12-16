import { StreamChat } from 'stream-chat';
import { API_ROOT } from "../constants";

export const selectComment = (comment, currentUserId) => {
  return {
    type: "SELECT_COMMENT",
    comment,
    currentUserId
  }
}

export const getMessagesFromStream = (commentID, userID) => {
	return dispatch => {
		dispatch({type: "RETRIEVING_STREAM_MESSAGES"})
	 	
	 	let configObj = {
	    method: "GET",
	    headers: {
	      "Content-Type": "application/json",
	      Accept: "application/json",
	      Authorization: localStorage.getItem("token")
	    }
	  }
	  fetch(API_ROOT + `/chats/authenticate`, configObj)
	    .then(resp => resp.json())
	    .then(async (data) => {
	      const userIdString = userID.toString()
	      const commentIdString = commentID.toString()

	      const client = StreamChat.﻿getInstance﻿(﻿﻿"37zxvpg2wqvj")﻿
				await client.﻿connectUser﻿({ id: userIdString}﻿, data.token)
				const channel = client.channel('comment-discussion', commentIdString); 				
				const state = await channel.watch(); 

				const messages = state.messages

        dispatch({ 
          type: 'SET_MESSAGES', 
          messages
        })   				
	   })
	    .catch(err => alert(err.message))		
	}
}