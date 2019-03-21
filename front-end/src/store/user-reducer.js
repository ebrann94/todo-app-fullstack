
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
            console.log('loginPending Action')
            return {
                logInPending: true
            }
        case 'LOGIN_SUCCESS':
            console.log('login succes action');
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

        default: 
            return {
                ...state
            }
    }
}