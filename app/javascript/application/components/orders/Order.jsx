import React from 'react'
import { Row, Col, Alert } from 'react-bootstrap'

const Value = ({name, value}) => (
    <div>
        <p><b>{name}</b></p>
        <p>{value}</p>
    </div>
);

const Order = ({order}) => (
    <div>
        <Row>
            <Col lg={12}>
                <Alert bsStyle="info"><b>Статус:</b> {order.status}</Alert>
            </Col>
        </Row>
        <Row>
            <Col lg={12}>
                <Value name="Телефон получателя"       value={order.receiver.phone} />
                <Value name="Имя получателя"           value={order.receiver.name} />
                <Value name="Наименование исполнителя" value={order.supplier} />
                <Value name="Адрес исполнителя"        value={order.address} />
                <Value name="Продукт"                  value={order.product} />
            </Col>
        </Row>
    </div>
);


export default Order