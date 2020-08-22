import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

// make sure url in baseURL is capitalized
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN DEFAULT';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
