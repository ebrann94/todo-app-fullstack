import { populateTasks } from './task-actions';

export const loginPending = () => {
    return {
        type: 'LOGIN_PENDING'
    }
}

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
}

const loginError = (error) => {
    return {
        type: 'LOGIN_ERROR',
        error
    }
}

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
        .then(res => {
            // Check for login erros
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Bad Request');
            }
        })
        .then(({ user, token, tasks }) => {
            localStorage.setItem('token', token);
            dispatch(login(user, token));
            dispatch(populateTasks(tasks));
        })
        .catch(err => {
            dispatch(loginError('Incorrect Password or Email'))
        });
    }
}

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
            }
        })
    }
}

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
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Unable to create account')
            }
        })
        .then(({user, token}) => {
            localStorage.setItem('token', token);
            dispatch(login(user, token));
        })
        .catch(err => {
            dispatch(loginError(err));
        })
    }
}

export const getUserInfo = () => {
    return dispatch => {
        fetch('/blah/users/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            const user = data.user;
            const tasks = data.tasks;
            dispatch(login(user));
            dispatch(populateTasks(tasks));
        })
    }
}