import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import { compose } from '@reduxjs/toolkit';
import { createStore } from '@reduxjs/toolkit';
import { rootReducer } from './redux/rootReducer';

declare global {
  interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const composeEnhancers =(window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


export const store = createStore(rootReducer,
  composeEnhancers(

  )
)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
