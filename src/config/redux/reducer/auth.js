const initialState ={
    // local storage
    username: JSON.parse(localStorage.getItem('username')) || {},
    token: localStorage.getItem('token'),
    isLoggedIn: localStorage.getItem('username') ? true : false,
    role: JSON.parse(localStorage.getItem('role')) || {},
    id: JSON.parse(localStorage.getItem('id')) || {},
    email: JSON.parse(localStorage.getItem('email')) || {},
}

const auth = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
        case 'LOGIN':
            return ({
                ...state,
                username: action.payload.data.user.username,
                token: action.payload.data.user.token,
                isLoggedIn: true,
                role: action.payload.data.user.role,
                id: action.payload.data.user.id,
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