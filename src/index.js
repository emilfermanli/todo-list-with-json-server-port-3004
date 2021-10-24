import React from 'react';
import ReactDOM from 'react-dom';
import './assets/style/style.css';
import App from './App';
import configureStore from "./redux/store/configureStore"
import {Provider} from "react-redux"

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


