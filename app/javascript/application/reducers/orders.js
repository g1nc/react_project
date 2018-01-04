const orders = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ORDER':
            return Object.assign({}, state, { order: action.order });
        case 'RESET_ORDER':
            return Object.assign({}, state, { order: null });
        case 'GET_ORDERS':
            return Object.assign({}, state, { collection: action.orders });
        case 'SET_CODE':
            return Object.assign({}, state, {
                code:  action.code,
                order: state.collection.find(order => order.code === action.code) || null
            });
        default:
            return state
    }
};

export default orders