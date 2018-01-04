import { connect } from 'react-redux'

import OrderList from '../components/orders/OrderList'
import {getOrders} from "../actions/orders";

const mapStateToProps = state => {
    return {
        orders: state.orders.collection,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMount: orders => dispatch(getOrders(orders))
    }
};

const OrdersContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList);

export default OrdersContainer


