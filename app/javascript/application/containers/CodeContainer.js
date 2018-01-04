import { connect } from 'react-redux'

import OrderCode from '../components/orders/OrderCode'
import { getOrders, setCode } from "../actions/orders"

const mapStateToProps = state => {
    return {
        code:  state.orders.code,
        order: state.orders.order
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onMount:      orders => dispatch(getOrders(orders)),
        handleChange: event  => dispatch(setCode(event.target.value))
    }
};

const CodeContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderCode);

export default CodeContainer


