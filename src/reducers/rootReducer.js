import { combineReducers } from "redux"
import groupsReducer from "./groupsReducer.js"
import userReducer from "./userReducer.js"
import discussionsReducer from "./discussionsReducer.js"
import topicsReducer from "./topicsReducer.js"
import sidenavReducer from "./sidenavReducer.js"
import reviewReducer from "./reviewReducer.js"

export default combineReducers({
	users: userReducer,
	sidenav: sidenavReducer,
	groups: groupsReducer,
	discussions: discussionsReducer,
	topics: topicsReducer,
	review: reviewReducer
})