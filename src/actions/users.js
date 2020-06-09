export const logIn = (user) => {
	return {
		type: "ADD_USER",
		user
	}
}

export const logOut = () => {
	return {
		type: "LOG_OUT"		
	}
}