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
  Jumbotron
} from 'react-bootstrap'
import MaskedInput from 'react-maskedinput'

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
function PhoneGroup({ id, label, help, collection, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <MaskedInput {...props} mask="+7 (111) 111-11-11" type="text" className={'form-control'}>
        {collection && collection.map((object) =>
          <option key={object.id} value={object.id}>{object.name}</option>
        )}
      </MaskedInput>
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sender_name:    '',
      sender_phone:   '',
      receiver_name:  '',
      receiver_phone: '',
      city_id:        '',
      user_id:        '',
      address_id:     '',
      product_id:     '',
      code:           null,
      cities:         [],
      users:          [],
      addresses:      [],
      products:       []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var state = {}
    state[event.target.name] = event.target.value
    this.setState(state);
    switch (event.target.name) {
      case 'city_id': this.reloadData('cities', event.target.value); break;
      case 'user_id': this.reloadData('users', event.target.value); break;
    }
  }

  reloadData(name, value) {
    if(name == 'cities') {
      this.fetchCollection('users', `city_id=${value}`)
    }
    if(name == 'users') {
      this.fetchCollection('addresses', `user_id=${value}`)
      this.fetchCollection('products', `user_id=${value}`)
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    var order_params = {
      order: {
        sender: {
          name:  this.state.sender_name,
          phone: this.state.sender_phone
        },
        receiver: {
          name:  this.state.receiver_name,
          phone: this.state.receiver_phone
        },
        city_id:    this.state.city_id,
        user_id:    this.state.user_id,
        address_id: this.state.address_id,
        product_id: this.state.product_id,
      },
      authenticity_token: this.getMetaContent("csrf-token")
    }
    var self = this;
    axios.post('api/orders', order_params)
      .then(function (response) {
        self.setState({ code: response.data.code });
      })
      .catch(error => {
        console.error(error)
      })
  }

  fetchCollection(name, params = '') {
    axios.get(`api/${name}?${params}`)
      .then(response => {
        var state = {}
        state[name] = response.data
        var id = response.data[0].id
        switch(name) {
          case 'cities':    this.setState({ city_id:    id }); break;
          case 'users':     this.setState({ user_id:    id }); break;
          case 'addresses': this.setState({ address_id: id }); break;
          case 'products':  this.setState({ product_id: id }); break;
        }

        if(contains(['cities', 'users'], name)) {
          this.reloadData(name, id)
        }
        this.setState(state)
      })
      .catch(error => {
        console.error(error)
      })
  }

  fetchData() {
    this.fetchCollection('cities')
  }

  componentWillMount() {
    this.fetchData()
  }

  getMetaContent(name) {
    var metas = document.getElementsByTagName('meta');
    for (var i=0; i<metas.length; i++) {
      if (metas[i].getAttribute("name") == name) {
        return metas[i].getAttribute("content");
      }
    }
    return "";
  }

  render() {
    return (
      <Row className={'justify-content-md-center'}>
        <Col lg={8} lgOffset={2}>
          {!this.state.code && <form onSubmit={this.handleSubmit}>
            <FieldGroup
              name="sender_name"
              label="Имя отправителя"
              id="senderName"
              type="text"
              onChange={this.handleChange}
              required />
            <PhoneGroup
              name="sender_phone"
              label="Телефон отправителя"
              id="senderPhone"
              onChange={this.handleChange}
              required />
            <FieldGroup
              name="receiver_name"
              label="Имя получателя"
              id="receiverName"
              type="text"
              onChange={this.handleChange}
              required />
            <PhoneGroup
              name="receiver_phone"
              label="Телефон получателя"
              id="receiverPhone"
              onChange={this.handleChange}
              required />
            <FieldGroup
              name="city_id"
              label="Город"
              id="citySelect"
              componentClass="select"
              collection={this.state.cities}
              onChange={this.handleChange} />
            <FieldGroup
              name="user_id"
              label="Наименование исполнителя"
              id="userSelect"
              componentClass="select"
              collection={this.state.users}
              onChange={this.handleChange} />
            <FieldGroup
              name="address_id"
              label="Адрес исполнителя"
              id="addressSelect"
              componentClass="select"
              collection={this.state.addresses}
              onChange={this.handleChange} />
            <FieldGroup name="product_id"
              label="Продукт"
              id="productSelect"
              componentClass="select"
              collection={this.state.products}
              onChange={this.handleChange} />
            <Button bsStyle="primary" type="submit">Отправить</Button>
          </form>}
          {this.state.code && <div>
            <br />
            <Jumbotron>
              <h1 className={'text-center'}>{this.state.code}</h1>
            </Jumbotron>
          </div>}
        </Col>
      </Row>
    );
  }
}
