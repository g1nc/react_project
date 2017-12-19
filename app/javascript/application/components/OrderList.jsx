import React from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios';

export default class OrderList extends React.Component {
  constructor(props) {
    debugger;
    super(props);
    this.state = {
      orders: []
    };
  }

  fetchOrders() {
    axios.get(`api/orders`)
      .then(response => {
        this.setState({ orders: response.data })
      })
      .catch(error => {
        console.error(error)
        this.setState({ fireRedirect: true })
      })
  }

  renderOrders() {
    return this.state.orders.map((order) =>
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.status}</td>
        <td>{order.sender.name}<br/>{order.sender.phone}</td>
        <td>{order.receiver.name}<br/>{order.receiver.phone}</td>
        <td>{order.supplier}</td>
        <td>{order.product}</td>
        <td>{order.code}</td>
      </tr>
    )
  }

  componentDidMount() {
    this.fetchOrders()
  }

  render() {
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Статус</th>
            <th>Отправитель</th>
            <th>Получатель</th>
            <th>Исполнитель</th>
            <th>Продукт</th>
            <th>Код</th>
          </tr>
        </thead>
        <tbody>
          { this.renderOrders() }
        </tbody>
      </Table>
    )
  }
}
