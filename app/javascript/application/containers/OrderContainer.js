import { connect } from 'react-redux'

import OrderForm from '../components/orders/OrderForm'
import {addOrder, resetOrder} from "../actions/orders";

const mapStateToProps = state => {
    return {
        cities:    state.cities.collection,
        addresses: state.addresses.collection,
        products:  state.products.collection,
        users:     state.users.collection,
        order:     state.orders.order
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dispatch: action => dispatch(action),
        resetOrder: () => dispatch(resetOrder()),
        onSubmit: order => dispatch(addOrder(order))
    }
};

const OrdersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderForm);

export default OrdersContainer


