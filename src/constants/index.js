// LOCAL
export const API_ROOT = 'http://localhost:3000';
export const API_WS_ROOT = 'ws://localhost:3000/cable';
export const STREAM_CLIENT_ID = "37zxvpg2wqvj"
export const STREAM_APP_ID = "1155294"


// PRODUCTION
// export const API_ROOT = 'https://vast-wave-32276.herokuapp.com';
// export const API_WS_ROOT = 'wss://crucible-api.herokuapp.com/cable';
// export const STREAM_CLIENT_ID = "segsgzcsweg6"
// export const STREAM_APP_ID = "1173272"

// export const API_ROOT = 'https://crucible-api.herokuapp.com';
// export const API_WS_ROOT = 'wss://crucible-api.herokuapp.com/cable';


export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
	Authorization: localStorage.getItem("token")
};