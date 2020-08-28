// LOCAL
// export const API_ROOT = 'http://localhost:3000';
// export const API_WS_ROOT = 'ws://localhost:3000/cable';

// PRODUCTION
export const API_ROOT = 'https://crucible-api.herokuapp.com';
export const API_WS_ROOT = 'wss://crucible-api.herokuapp.com/cable';


export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
	Authorization: localStorage.getItem("token")
};