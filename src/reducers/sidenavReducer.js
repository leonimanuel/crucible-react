export default function sidenavReducer(state = {
	showDetailPane: true,
	sidenavOpen: true
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
		
		case "TOGGLE_SIDENAV":
			return {
				...state,
				sidenavOpen: action.bool
			}

		default: 
			return state
	}
}