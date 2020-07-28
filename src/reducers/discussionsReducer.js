import _ from 'lodash';
import cloneDeep from "lodash/cloneDeep"

export default function discussionsReducer(state = {
	allDiscussions: [],
	selectedDiscussionId: "",
	selectedDiscussion: "",
	allComments: [],
	addedNewComment: false,
	allMessages: [],
	loading: false,
	renderForum: false,
	commentsRendered: false,
	allInterests: [],
	discussionGuests: []
	// selectedInterests: []
}, action) {
		// console.log("executing discussionsReducer")
		switch (action.type) {
			case "ADD_DISCUSSIONS":
				return {
					...state,
					allDiscussions: action.discussions
				}

			case "LOADING_DISCUSSION":
				return {
					...state,
					loading: true
				}

			case "POSTING_DISCUSSION":
				return {
					...state,
					loadingComment: true
				}

			case "ADD_DISCUSSION_AND_COMMENTS":
				// let detailedDiscussion = action.discussionData
				// state.allDiscussions.findIndex(discussion => discussion.id === detailedDiscussion.id)
				return {
					...state,
					selectedDiscussionId: action.discussionData.id,
					selectedDiscussion: action.discussionData,
					allDiscussions: [...state.allDiscussions.filter(d => d.id !== action.discussionData.id), action.discussionData],
					allComments: state.allComments.filter(c => c.discussion_id !== action.discussionData.id).concat(action.discussionData.comments),
					commentsRendered: false,
					discussionGuests: action.discussionData.guests
					// discussion
				}

			case "ADD_GUESTS":
				debugger
				return {
					...state,
					addGuests: action.discussionData.guests
				}

			case "ADD_NEW_DISCUSSION":
				return {
					...state,
					allDiscussions: [...state.allDiscussions, action.discussion]
				}

			case "ADD_COMMENT_TO_DISCUSSION":
				return {
					...state,
					allComments: [...state.allComments, action.comment],
					addedNewComment: true
				}

			case "FALSIFY_ADDED_NEW_COMMENT":
				return {
					...state,
					addedNewComment: false
				}

			case "ADD_MESSAGES_TO_DISCUSSION":
				return {
					...state,
					allMessages: state.allMessages.concat(action.messages)
				}

			case "ADD_MESSAGE_TO_DISCUSSION":
				console.log("adding message to discussion, updating state")
				return {
					...state,
					allMessages: [...state.allMessages, action.message]
				}				
		
			case "RESET_DISCUSSION_UNREAD_COUNT":
				let discussionsClone = _.cloneDeep(state.allDiscussions)
				let resetDiscussion = discussionsClone.find(discussion => discussion.id === parseInt(action.response.discussion_id));

				debugger
				if (action.response.unread_messages === 0 ) {
					resetDiscussion.unread_messages_count = 0
				} else if (action.response.unread_messages === 1 && !(state.renderForum && state.selectedDiscussionId === action.response.discussion_id)) {
					resetDiscussion.unread_messages_count += 1
				}
				
				let updatedDiscussions = discussionsClone.filter(discussion => discussion.id !== resetDiscussion.id)
				updatedDiscussions.push(resetDiscussion)
				return {
					...state,
					allDiscussions: updatedDiscussions,
				}

			case "ZERO_UNREAD_COUNT":
				debugger
				let discsClone = _.cloneDeep(state.allDiscussions)
				let zeroedDiscussion = discsClone.find(discussion => discussion.id === parseInt(action.response.discussion_id));
				zeroedDiscussion.unread_messages_count = 0

				return {
					...state,
					allDiscussions: [...discsClone.filter(d => d.id !== zeroedDiscussion.id), zeroedDiscussion]
				}

			case "TOGGLE_FORUM":
				if (action.bool === false) {
					return { ...state, renderForum: false }
				} else {
					return { ...state, renderForum: !state.renderForum }
				}

			case "SET_COMMENTS_RENDERED_TO_TRUE":
				return {
					...state,
					commentsRendered: true
				}

			case "LOAD_INTERESTS":
				// debugger
				return {
					...state,
					allInterests: action.interests,
					// selectedInterests: action.interests.filter(i => i.selected === true)
				}

			case "UPDATE_SELECTED_INTERESTS":
				return {
					...state,
					allInterests: action.interests
				}


			default:
				return state;	
		}
}
