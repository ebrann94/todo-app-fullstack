import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/configure-store';
import { Provider } from 'react-redux';
import App from './App';
import './styles/styles.scss';

const store = configureStore();
// store.subscribe(() => console.log(store.getState()));

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));


