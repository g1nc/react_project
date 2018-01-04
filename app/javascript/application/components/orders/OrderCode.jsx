import React from 'react'
import axios from 'axios';
import PropTypes from 'prop-types'
import { Row, Col, Button, Alert } from 'react-bootstrap'

import { FieldGroup } from '../layout/FormGroups'
import Order from "./Order";

export default class OrderCode extends React.Component {
    constructor(props) {
        super(props);

        this.state = {code: props.order ? props.order.code : ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({code: e.target.value});
        this.props.setCode(e.target.value);
    }

    handleSubmit() {
        this.props.setCode(this.state.code);
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
                    <FieldGroup name="code" label="Код" id="orderCode" type="text"
                                onChange={this.handleChange} value={this.state.code} required />
                    <Button bsStyle="primary" onClick={this.handleSubmit}>Отправить</Button>
                    <div>
                        <br/>
                        {this.props.order && <Order order={this.props.order} />}
                        {!this.props.order &&
                            <Row>
                                <Col lg={12}>
                                    <Alert bsStyle="warning">Заказ не найден</Alert>
                                </Col>
                            </Row>
                        }
                    </div>
                </Col>
            </Row>
        )
    }
}

OrderCode.propTypes = {
    setCode: PropTypes.func.isRequired
};