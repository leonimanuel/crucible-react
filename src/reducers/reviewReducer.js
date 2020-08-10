// import chunk from 'lodash/chunk';
// import _ from 'lodash';

export default function userReducer(state = {
	itemUnderReview: "",
	allReviewItems: []
}, action) {
	// console.log("executing userReducer")
	switch (action.type) {
		case "ADD_REVIEW_ITEMS":			
			let itemsArray = [...action.itemsObj.facts, ...action.itemsObj.comments, ...action.itemsObj.facts_comments]
			// let itemsArray = action.itemsObj.fact_rephrases
			let shuffledItemsArray = shuffle(itemsArray)
			
			let firstItem = shuffledItemsArray.shift();
			// debugger
			let remainingItems = shuffledItemsArray

			return {
				itemUnderReview: firstItem,
				allReviewItems: remainingItems
			}

		case "RESET_ITEM_UNDER_REVIEW":
			debugger
			return {
				itemUnderReview: state.allReviewItems.shift(),
				allReviewItems: state.allReviewItems				
			}


		case "UPDATE_ITEM_SCORE":
			const votedItem = state.allReviewItems.find(item => item.id === action.itemId)
			action.vote === "upvote" ? votedItem.score += 1 : votedItem.score -= 1
			return {
				...state,
				allReviewItems: [...state.allReviewItems.filter(item => item.id !== votedItem.id), votedItem]
			}

		default:
			return state;
	}
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



