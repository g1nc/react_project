import React from 'react'
import { Table } from 'react-bootstrap'
import axios from 'axios'

export default class OrderList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let self = this;
        axios.get('/api/orders')
            .then(response => self.props.onMount(response.data))
            .catch(error =>  console.error(error));
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
                    { this.props.orders.map((order) =>
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.status}</td>
                            <td>{order.sender.name}<br/>{order.sender.phone}</td>
                            <td>{order.receiver.name}<br/>{order.receiver.phone}</td>
                            <td>{order.supplier}</td>
                            <td>{order.product}</td>
                            <td>{order.code}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        )
    }
}
