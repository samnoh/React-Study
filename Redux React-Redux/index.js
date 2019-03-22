import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore } from 'redux';
import { Provider } from 'react-redux'; // make redux easier
import reducersApp from './reducers'

const redux_store = createStore(reducersApp);

ReactDOM.render(
    <Provider store={redux_store}>
        <App />
    </Provider>,
    document.getElementById('root')
);