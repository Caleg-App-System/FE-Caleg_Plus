const initialState ={
    // local storage
    username: JSON.parse(localStorage.getItem('username')) || {},
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('username') ? true : false,
    roleId: JSON.parse(localStorage.getItem('role')) || {},
    id: JSON.parse(localStorage.getItem('id')) || {},
    email: JSON.parse(localStorage.getItem('email')) || {},
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return ({
                ...state,
                username: action.payload.data.username,
                token: action.payload.data.token,
                isLoggedIn: true,
                roleId: action.payload.data.roleId,
                id: action.payload.data.id,
            });
        case 'LOGOUT':
            return ({
                ...state,
                username: {},
                token: null,
                isLoggedIn: false
            });
        default:
            return state;
    }
}

export default auth