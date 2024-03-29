export default function networkReducer(state = {
	followingContacts: [],
	followersContacts: [],
	selectedContact: "",
	recommendedMembers: [],
	// searchedMembers: [],
	membersFollowStatuses: [],
	contactFeed: [],
	hasMore: true
}, action) {
	switch(action.type) {
		case "SET_NETWORK_FOLLOWING":
			return {
				...state,
				followingContacts: [...action.contacts]
			}

		case "SET_NETWORK_FOLLOWERS":
			return {
				...state,
				followersContacts: [...action.contacts]
			}			

		case "SET_SELECTED_CONTACT":
			const sortedUserActivities = action.activities.sort((a, b) => new Date(b.time) - new Date(a.time))
			const newContactSelection = !!(action.contact.id !== state.selectedContact.id)
			return {
				...state,
				selectedContact: action.contact,
				contactFeed: newContactSelection ? sortedUserActivities : [...state.contactFeed, ...sortedUserActivities],
				hasMore: !!sortedUserActivities.length,
				membersFollowStatuses: [...state.membersFollowStatuses.filter(i => i.memberId != action.contact.id), {memberId: action.contact.id, isFollowing: action.contact.is_following}]
			}

		case "CLEAR_SELECTED_CONTACT":
			return {
				...state,
				selectedContact: "",
				contactFeed: []
			}

		case "CHANGE_MEMBER_FOLLOW_STATUS":
			
			let selectedContact = state.selectedContact
			if (action.member.id == selectedContact.id) {
				selectedContact["is_following"] = action.followStatus
			}

			// Add/remove member from "following" list based on user action
			let followingContacts = state.followingContacts
			let memberInQuestion = (action.member.id == selectedContact.id) ? selectedContact : action.member
			if (action.followStatus == true) {
				memberInQuestion["type"] = "following"
				followingContacts = followingContacts.find(m => m.id == memberInQuestion.id) ? followingContacts : [...followingContacts, memberInQuestion]
			} else if (action.followStatus == false) {
				followingContacts = followingContacts.filter(m => m.id != memberInQuestion.id)
			}

			let newMemberFollowStatus = {memberId: action.member.id, isFollowing: action.followStatus}
			let updatedMembersFollowStatuses = (
				[...state.membersFollowStatuses.filter(i => i.memberId != action.member.id), newMemberFollowStatus]
			) 

			return {
				...state,
				selectedContact: selectedContact,
				followingContacts: followingContacts,
				membersFollowStatuses: updatedMembersFollowStatuses
			}

		case "SET_MEMBER_RECOMMENDATIONS":
			let recommendedMembers = action.members.map(member => {
				member["type"] = "recommendation"
				return member
			})

			let recommendedMembersFollowingStatus = recommendedMembers.map(member => {
				return {memberId: member.id, isFollowing: member.is_following}
			})

			function uniquifyMemberArray(memberArray) {
				return memberArray.filter((value, index, self) => {
				  return self.findIndex(v => v.memberId === value.memberId) === index;
				})
			}

			return {
				...state,
				recommendedMembers: recommendedMembers,
				membersFollowStatuses: uniquifyMemberArray([...state.membersFollowStatuses, ...recommendedMembersFollowingStatus])
			}


		// case "SET_MEMBER_SEARCH_RESULTS":
		// 	let searchedMembers = action.members.map(member => {
		// 		member["type"] = "searched"
		// 		return member
		// 	})

		// 	let searchedMembersFollowingStatus = searchedMembers.map(member => {
		// 		return {memberId: member.id, isFollowing: member.is_following}
		// 	})

		// 	return {
		// 		...state,
		// 		searchedMembers: searchedMembers,
		// 		membersFollowStatuses: searchedMembersFollowingStatus,
		// 		recommendedMembers: []
		// 	}

		case "SET_MEMBER_SEARCH_RESULTS_FOLLOWING_STATUS":
			const membersFollowStatuses = [...state.membersFollowStatuses, ...action.searchedMembersFollowStatuses]
			const uniqueArray = membersFollowStatuses.filter((value, index) => {
			  const _value = JSON.stringify(value);
			  return index === membersFollowStatuses.findIndex(obj => {
			    return JSON.stringify(obj) === _value;
			  });
			});	

			return {
				...state,
				membersFollowStatuses: uniqueArray,
				recommendedMembers: []
			}

			case "SET_GROUP_MEMBERS_FOLLOWING_STATUSES":
				let memberFollowships = action.memberFollowships.map(m => { 
					return {memberId: m.id, isFollowing: m.is_following}
				})

				return {
					...state,
					membersFollowStatuses: [...state.membersFollowStatuses, ...memberFollowships]
				}

		case "CLEAR_RECOMMENDATIONS_AND_SEARCHES":
			return {
				...state,
				recommendedMembers: [],
				searchedMembers: []	
			}

		default: 
			return state
	}
}