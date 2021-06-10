import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaModdleware from 'redux-saga';
import reportWebVitals from './reportWebVitals';
import reducer from './global-store/ReduxSaga/Reducers/reducer';
import { watchAuth } from "./global-store/ReduxSaga/Sagas/index";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = (process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;

const sagaMiddleware = createSagaModdleware();

const store = createStore(reducer,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ));
sagaMiddleware.run(watchAuth);

const app = <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</Provider>


ReactDOM.render(app, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
