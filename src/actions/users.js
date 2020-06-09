export const addEmail = (user) => {
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