export default function sidenavReducer(state = {
	showDetailPane: false,
}, action) {
	switch(action.type) {
		case "SHOW_DETAIL_PANE":
			return {
				...state,
				showDetailPane: true
			}

		case "HIDE_DETAIL_PANE":
			return {
				...state,
				showDetailPane: false
			}
		
		default: 
			return state
	}
}