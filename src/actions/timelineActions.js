import { API_ROOT } from "../constants"

export const setActivities = () => {
	return (dispatch) => {
		dispatch({
			type: "LOADING_ACTIVITIES"
		})
	
		let configObj = {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: localStorage.getItem("token")
			}
		}

		fetch(API_ROOT + "/timeline", configObj)
			.then(resp => resp.json())
			.then(activities => {
				dispatch({
					type: "SET_ACTIVITIES",
					activities
				})
				// this.setState({timeline_activities: activities})
			})	
	}		
}