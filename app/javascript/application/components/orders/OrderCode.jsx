import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'
import { Row, Col, Button, Alert } from 'react-bootstrap'

import { FieldGroup } from '../layout/FormGroups'
import Order from "./Order";

export default class OrderCode extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let self = this;
        axios.get('/api/orders')
            .then(response => self.props.onMount(response.data))
            .catch(error => console.error(error));
    }

    render() {
        return (
            <Row className={'justify-content-md-center'}>
                <Col lg={8}>
                    <form onSubmit={this.props.handleChange}>
                        <FieldGroup name="code" label="Код" id="orderCode"
                                    type="text" onChange={this.props.handleChange}
                                    value={this.props.code}
                                    required />
                        <Button bsStyle="primary" onSubmit={this.props.handleSubmit}>Отправить</Button>
                    </form>
                    <div>
                        <br/>
                        {this.props.order
                         ? <Order order={this.props.order} />
                         : (<Row>
                                <Col lg={12}>
                                    <Alert bsStyle="warning">Заказ не найден</Alert>
                                </Col>
                            </Row>)
                        }
                    </div>
                </Col>
            </Row>
        )
    }
}

OrderCode.propTypes = {
    handleChange: PropTypes.func.isRequired
};