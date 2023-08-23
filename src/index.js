import React from 'react';
import ReactDOM from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import * as serviceWorker from './serviceWorker';
import App from './App';
import './index.css';

ReactDOM.render(
  <BrowserRouter basename={"https://steteler.github.io/steteler-recipes-app"}>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
