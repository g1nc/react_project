const users = (state = [], action) => {
    switch (action.type) {
        case 'GET_USER':
            return Object.assign({}, state, {
                user: action.user
            });
        case 'GET_USERS':
            return Object.assign({}, state, {
                collection: action.users
            });
        default:
            return state
    }
};

export default users