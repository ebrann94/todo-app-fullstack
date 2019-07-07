import { populateLists } from "./list-actions";
import { handleJSONResponse } from "./utils";

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
        fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
        .then(handleJSONResponse)
        .then(({ user, token, lists }) => {
            localStorage.setItem('token', token);
            dispatch(login(user, token));
            // console.log(lists);
            dispatch(populateLists(lists));
        })
        .catch(err => {
            // console.log(err);
            dispatch(loginError('Incorrect Password or Email'))
        });
    }
};

export const startLogout = () => {
    return (dispatch) => {
        fetch('/api/users/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => {
            if (res.ok) {
                dispatch({ type: 'LOGOUT_SUCCESS'});
                localStorage.removeItem('token');
            }
        })
    }
};

export const startSignup = (data) => {
    return dispatch => {
        dispatch(loginPending());
        fetch('/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(handleJSONResponse)
        .then(({user, token}) => {
            // console.log(user, token);
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
        fetch('/api/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(handleJSONResponse)
        .then(({ user, lists}) => {
            dispatch(login(user));
            // console.log(lists);
            if (lists.length > 0) {
                dispatch(populateLists(lists));
            }
        }).catch(error => {
            console.log(error);
        })
    }
};

export const setCurrentList = listId => {
    // console.log(listId);
    return {
        type: 'SET_CURRENT_LIST',
        listId
    }
};