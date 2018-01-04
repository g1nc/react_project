const cities = (state = [], action) => {
    switch (action.type) {
        case 'GET_CITIES':
            return Object.assign({}, state, {
                collection: action.cities
            });
        default:
            return state
    }
};

export default cities