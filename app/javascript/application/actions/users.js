import axios from 'axios'

export const getUser = user => {
    return {
        type: 'GET_USER',
        user
    }
};

export const getUsers = users => {
    return {
        type: 'GET_USERS',
        users
    };
};

