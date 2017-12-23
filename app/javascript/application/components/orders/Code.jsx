import React from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap'

export default class OrderCode extends React.Component {
  constructor(props) {
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

  componentWillMount() {
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
