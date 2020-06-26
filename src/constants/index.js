export const API_ROOT = 'https://crucible-beta.herokuapp.com';
export const API_WS_ROOT = 'wss://crucible-beta.herokuapp.com/cable';
export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
	Authorization: localStorage.getItem("token")
};