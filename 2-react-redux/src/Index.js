import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App';
import reducers from './reducers/Index';

const createStoreWithMiddleware = applyMiddleware()(createStore);
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers,reduxDevTool)}>
    <App />
  </Provider>
  , document.querySelector('.container'));
