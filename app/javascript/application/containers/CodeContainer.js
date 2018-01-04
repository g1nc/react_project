import { connect } from 'react-redux'

import OrderCode from '../components/orders/OrderCode'
import { getOrders, getOrder } from "../actions/orders"

const mapStateToProps = state => {
    return {
        order: state.orders.order
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMount: orders => dispatch(getOrders(orders)),
        setCode: code   => dispatch(getOrder(code))
    }
};

const CodeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderCode);

export default CodeContainer


