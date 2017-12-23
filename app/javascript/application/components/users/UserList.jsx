import React from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap'

export default class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  fetchUsers() {
    axios.get('api/users')
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(error => {
        console.error(error)
      })
  }

  renderOrders() {
    return this.state.users.map((user) =>
      <tr key={user.id}>
        <td>{user.id}</td>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.orders}</td>
      </tr>
    )
  }

  componentWillMount() {
    this.fetchUsers()
  }

  render() {
    return (
      <Table responsive>
        <thead>
        <tr>
          <th>#</th>
          <th>Имя</th>
          <th>Email</th>
          <th>Заказов</th>
        </tr>
        </thead>
        <tbody>
          { this.renderOrders() }
        </tbody>
      </Table>
    )
  }
}
