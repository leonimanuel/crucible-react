import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//for mdb-react
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import * as serviceWorker from './serviceWorker';
// import _ from 'lodash';
import { ActionCableProvider } from 'react-actioncable-provider';

import App from './App';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from "./reducers/rootReducer.js"
import { API_WS_ROOT } from "./constants";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancer(applyMiddleware(thunk)),
);

ReactDOM.render(
  <React.StrictMode>
	  <Provider store={store}>
	    <ActionCableProvider url={API_WS_ROOT}>
		    <App store={store}/>  	    	
	    </ActionCableProvider>
	  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
