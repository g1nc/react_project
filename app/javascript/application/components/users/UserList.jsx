import React from 'react'
import axios from 'axios';
import { Table } from 'react-bootstrap'

export default class UserList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let self = this;
        axios.get('/api/users')
            .then(response => self.props.onMount(response.data))
            .catch(error =>  console.error(error));
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
                    {this.props.users.map((user) =>
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.orders}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}
