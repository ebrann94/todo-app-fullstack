import { createStore, combineReducers, applyMiddleware } from 'redux';
import listsReducer from './list-reducer';
import userReducer from './user-reducer';
import thunk from 'redux-thunk';

export default () => {
    return createStore(
        combineReducers({
            lists: listsReducer,
            user: userReducer
        }),
        applyMiddleware(thunk)
    );
}