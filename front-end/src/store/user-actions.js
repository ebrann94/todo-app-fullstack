import { batch } from 'react-redux';
import { populateLists } from "./list-actions";
import { handleJSONResponse } from "./utils";
import * as API from '../api/api';

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

const login = (user, token, lists) => {
    return {
        type: 'LOGIN_SUCCESS',
        payload: {
            user,
            token,
            lists
        }
    }
};

const logout = () => ({ type: 'LOGOUT_SUCCESS' })

export const startLogin = (userInfo) => {
    return async (dispatch) => {
        dispatch(loginPending());

        try {
            const { user, token, lists } = await API.login(userInfo)
            dispatch(login(user, token, lists));
            
        } catch (e) {
            dispatch(loginError('Incorrect Password or Email'))
        }
    }
};

export const startLogout = () => {
    return async (dispatch) => {
        try {
            await API.logout()
            dispatch(logout())
        } catch (e) {

        }
    }
};

export const startLogoutAll = () =>
    async dispatch => {
        try {
            await API.logoutAll()
            dispatch(logout())
        } catch (e) {

        }
    };

export const startSignup = (data) => {
    return async dispatch => {
        dispatch(loginPending());

        try {
            const { user, token } = await API.createAccount(data)
            
            dispatch(login(user, token, []))
        } catch (e) {
            dispatch(loginError(e))
        }
    }
};

export const getUserInfo = () => {
    return async dispatch => {
        dispatch(loginPending());
        try {
            const { user, lists } = await API.getUserData()
            const token = localStorage.getItem('token')
            dispatch(login(user, token, lists))

        } catch (e) {
            console.log(e)
        }
    }
};

export const setCurrentList = listId => {
    // console.log(listId);
    return {
        type: 'SET_CURRENT_LIST',
        listId
    }
};