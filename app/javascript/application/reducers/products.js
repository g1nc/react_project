const products = (state = [], action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return Object.assign({}, state, {
                collection: action.products
            });
        default:
            return state
    }
};

export default products