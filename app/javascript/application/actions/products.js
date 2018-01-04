export const getProducts = products => {
    return {
        type: 'GET_PRODUCTS',
        products: products
    }
};