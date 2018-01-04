export const getOrders = orders => {
    return {
        type: 'GET_ORDERS',
        orders: orders
    }
};

export const resetOrder = () => {
    return {
        type: 'RESET_ORDER'
    }
};

export const addOrder = order => {
    return {
        type: 'ADD_ORDER',
        order
    }
};

export const getOrder = code => {
    return {
        type: 'GET_ORDER',
        code
    }
};

export const setCode = code => {
    return {
        type: 'SET_CODE',
        code
    }
};

