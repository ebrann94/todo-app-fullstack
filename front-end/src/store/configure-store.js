import { createStore, combineReducers, applyMiddleware } from 'redux';
import tasks from './task-reducer';
import user from './user-reducer';
import thunk from 'redux-thunk';

export default () => {
    return createStore(
        combineReducers({tasks, user}),
        applyMiddleware(thunk)
    );
}