const addresses = (state = [], action) => {
    switch (action.type) {
        case 'GET_ADDRESSES':
            return Object.assign({}, state, {
                collection: action.addresses
            });
        default:
            return state
    }
};

export default addresses