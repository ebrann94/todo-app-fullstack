
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
    loginError: '',
    currentListId: ''
};

const devState = {
    clientToken: localStorage.getItem('token') || '',
    user: {
        firstName: 'Ethan',
        secondName: 'Brann',
        email: '',
        id: ''
    },
    loggedIn: true,
    loginPending: false,
    loginError: ''
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_PENDING':
            return {
                loginPending: true
            };
        case 'LOGIN_SUCCESS':
            return {
                clientToken: action.token,
                user: action.user,
                loggedIn: true,
                loginPending: false
            };
        case 'LOGOUT_SUCCESS':
            return {
                ...defaultState
            };
        case 'LOGIN_ERROR' :
            return {
                loginPending: false,
                loginError: action.error
            };
        case 'SET_CURRENT_LIST':
            return {
                ...state,
                currentListId: action.listId
            };
        default: 
            return {
                ...state
            }
    }
}