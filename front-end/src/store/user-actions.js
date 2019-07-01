import { populateTasks } from './task-actions';
import { handleResponse } from "./utils";

export const loginPending = () => {
    return {
        type: 'LOGIN_PENDING'
    }
};

const loginError = (error) => {
    return {
        type: 'LOGIN_ERROR',
        error
    }
};

const login = ({firstName, lastName, email, _id}, token) => {
    return {
        type: 'LOGIN_SUCCESS',
        user: {
            firstName,
            lastName,
            email,
            _id
        },
        token
    }
};

export const startLogin = (userInfo) => {
    return (dispatch) => {
        dispatch(loginPending());
        // Login route
        fetch('/blah/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(handleResponse)
        .then(({ user, token, tasks }) => {
            localStorage.setItem('token', token);
            dispatch(login(user, token));
            dispatch(populateTasks(tasks));
        })
        .catch(err => {
            // console.log(err);
            dispatch(loginError('Incorrect Password or Email'))
        });
    }
};

export const startLogout = () => {
    return (dispatch) => {
        fetch('/blah/users/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (res.ok) {
                dispatch({type: 'LOGOUT_SUCCESS'});
                localStorage.removeItem('token');
            } else {

            }
        });
    }
};

export const startSignup = (data) => {
    return dispatch => {
        dispatch(loginPending());
        fetch('/blah/users/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(handleResponse)
        .then(({user, token}) => {
            localStorage.setItem('token', token);
            dispatch(login(user, token));
        })
        .catch(error => {
            console.log(error);
            dispatch(loginError(error));
        });
    }
};

export const getUserInfo = () => {
    return dispatch => {
        dispatch(loginPending());
        fetch('/blah/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(handleResponse)
        .then(({ user, tasks}) => {
            dispatch(login(user));
            dispatch(populateTasks(tasks));
        }).catch(error => {
            console.log(error);
        })
    }
};

export const setCurrentList = listId => {
    return {
        type: 'SET_CURRENT_LIST',
        listId
    }
};