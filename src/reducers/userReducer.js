export default function userReducer(state = {
	isLoggedIn: false,
	userEmail: "none"
}, action) {
	switch (action.type) {
		case "ADD_USER":
			return {
				isLoggedIn: true, //necessary?
				userEmail: action.user.email
			}
		
		case "LOG_OUT":
			return {
				isLoggedIn: false,
				userEmail: "none"
			}
			
		default:
			return state;
	}
};

// export default userReducer;