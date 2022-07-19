


// LOCAL
export const API_ROOT = process.env.NODE_ENV === "development" ? 'http://localhost:3000' : 'https://vast-wave-32276.herokuapp.com';
export const API_WS_ROOT = process.env.NODE_ENV === "development" ? 'ws://localhost:3000/cable' : 'wss://crucible-api.herokuapp.com/cable';
export const MIXPANEL_TOKEN = process.env.NODE_ENV === "development" ? "291a7d96c4980cddfe0015b895bb6d8a" : "e05cb8fbf040b90d8481ccb37072a407"
export const STREAM_CLIENT_ID = process.env.NODE_ENV === "development" ? "37zxvpg2wqvj" : "segsgzcsweg6"
export const STREAM_APP_ID = process.env.NODE_ENV === "development" ? "1155294" : "1173272"
export const APP_NAME = "Clammer" 
export const CONTACT_EMAIL = "leon@clammer.io"
export const TERMS_AND_CONDITIONS_URL = "https://www.termsfeed.com/live/2c4409a8-3ebf-497d-82fb-8b6d5909d8f3"
export const PRIVACY_POLICY_URL = "https://www.termsfeed.com/live/fa62d8b5-7204-44a7-9835-9c71f9e690ff"

// PRODUCTION
// export const API_ROOT = 'https://vast-wave-32276.herokuapp.com';
// export const API_WS_ROOT = 'wss://crucible-api.herokuapp.com/cable';
// export const MIXPANEL_TOKEN="e05cb8fbf040b90d8481ccb37072a407"
// export const STREAM_CLIENT_ID = "segsgzcsweg6"
// export const STREAM_APP_ID = "1173272"

export const HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
	Authorization: localStorage.getItem("token")
};

//dev
// export const GA4_MEASUREMENT_ID = "G-T4DQEP9MT8"

// prod
export const GA4_MEASUREMENT_ID = "G-YT8SYJHZTD"


// export const gtag = () => {dataLayer.push(arguments);}

// export const API_ROOT = 'https://crucible-api.herokuapp.com';
// export const API_WS_ROOT = 'wss://crucible-api.herokuapp.com/cable';

