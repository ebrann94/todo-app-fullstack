
const defaultState = {
    clientToken: '',
    user: {
        firstName: '',
        secondName: '',
        email: '',
        id: ''
    },
    loggedIn: false,
    loginPending: false,
    loginError: ''
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_PENDING':
            return {
                logInPending: true
            }
        case 'LOGIN_SUCCESS':
            return {
                clientToken: action.token,
                user: action.user,
                loggedIn: true,
                logInPending: false
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...defaultState
            }
        case 'LOGIN_ERROR' :
            return {
                logInPending: false,
                loginError: action.error
            }
        default: 
            return {
                ...state
            }
    }
}