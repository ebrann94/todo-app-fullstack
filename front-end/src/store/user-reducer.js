
const defaultState = {
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

export default (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN_PENDING':
            return {
                ...state,
                loginPending: true
            };
        case 'LOGIN_SUCCESS':
            return {
                clientToken: action.payload.token,
                user: {
                    ...action.payload.user
                },
                loggedIn: true,
                loginPending: false,
                currentListId: action.payload.lists.length > 0 ? action.payload.lists[0].id : ''
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
        case 'SET_CURRENT_LIST_TO_FIRST':
            console.log(state);
            return {
                ...state,
            }
        default: 
            return {
                ...state
            }
    }
}