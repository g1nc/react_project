import React from 'react'
import axios from 'axios';
import { contains } from 'underscore'
import {
  Row,
  Col,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Jumbotron,
  Alert
} from 'react-bootstrap'

function FieldGroup({ id, label, help, collection, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props}>
        {collection && collection.map((object) =>
          <option key={object.id} value={object.id}>{object.name}</option>
        )}
      </FormControl>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code:  null,
      order: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var state = {}
    state[event.target.name] = event.target.value
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.get(`/api/orders?code=${this.state.code}`)
      .then(response => {
        this.setState({ order: response.data[0] })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
      <Row className={'justify-content-md-center'}>
        <Col lg={8}>
          <form onSubmit={this.handleSubmit}>
            <FieldGroup name="code"
                        label="Код"
                        id="orderCode"
                        type="text"
                        onChange={this.handleChange}
                        required />
            <Button bsStyle="primary" type="submit">Отправить</Button>
          </form>
          {this.state.order && <div>
            <br />
            <Row>
              <Col lg={12}>
                <Alert bsStyle="info">
                  <strong>Статус:</strong> {this.state.order.status}
                </Alert>
              </Col>
            </Row>
            <Row>
              <Col lg={12}>
                <p><b>Телефон получателя</b></p>
                <p>{this.state.order.receiver.phone}</p>
                <p><b>Имя получателя</b></p>
                <p>{this.state.order.receiver.name}</p>
                <p><b>Наименование исполнителя</b></p>
                <p>{this.state.order.supplier}</p>
                <p><b>Адрес исполнителя</b></p>
                <p>{this.state.order.address}</p>
                <p><b>Продукт</b></p>
                <p>{this.state.order.product}</p>
              </Col>
            </Row>
          </div>}
        </Col>
      </Row>
    );
  }
}
