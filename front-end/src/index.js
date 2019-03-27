import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import tasks from './store/task-reducer';
import user from './store/user-reducer';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import App from './App';
import './styles/styles.scss';

const store = createStore(combineReducers({tasks, user}), applyMiddleware(thunk));

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));


