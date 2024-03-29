export default function briefingsReducer(state = {
	allBriefings: [],
	articles: []
}, action) {
	switch(action.type) {
		case "SET_ARTICLES":
			return {
				...state,
				articles: action.articles
			}

		case "ADD_BRIEFINGS":
			const shuffledBriefings = shuffle(action.briefings)
			return {
				...state,
				allBriefings: shuffledBriefings
			}

		
		default: 
			return state
	}
}

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