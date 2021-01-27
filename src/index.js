import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import "bootswatch/dist/cerulean/bootstrap.min.css";

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

reportWebVitals();
