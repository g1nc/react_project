import React from 'react'
import axios from 'axios'
import { cloneDeep, filter } from 'lodash'
import { Row, Col, Button, Jumbotron } from 'react-bootstrap'

import {FieldGroup, MaskedGroup} from "../layout/FormGroups"
import {getCities} from "../../actions/cities";
import {getAddresses} from "../../actions/addresses";
import {getProducts} from "../../actions/products";
import {getUsers} from "../../actions/users";

export default class OrderForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        sender: { name: '', phone: '' },
        receiver: { name: '', phone: '' },
        city_id: '',
        user_id: '',
        address_id: '',
        product_id: '',
        code: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateValues = this.updateValues.bind(this);
  }

    handleChange(event) {
        let target = event.target;
        let state  = {};
        switch (target.name) {
            case 'city_id':
                let city_id = parseInt(target.value) || target.value;
                state = {city_id: city_id};
                break;
            case 'receiver':
                state[target.name] = cloneDeep(this.state[target.name]);
                state[target.name][target.dataset.attr] = target.value;
                break;
            case 'sender':
                state[target.name] = cloneDeep(this.state[target.name]);
                state[target.name][target.dataset.attr] = target.value;
                break;
            default:
                state[target.name] = parseInt(target.value) || target.value;
                break;
        }
        this.updateValues();
        this.setState(state);
    }

    updateValues(city_id = this.state.city_id) {
        let user_id    = this.props.users.find(user => user.city_id === city_id).id;
        let address_id = this.props.addresses.find(address => address.user_id === user_id).id;
        let product_id = this.props.products.find(product => product.user_id === user_id).id;
        this.setState({user_id: user_id, address_id: address_id, product_id: product_id})
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateValues();
        axios.post('api/orders', { order: this.state })
            .then(response => this.props.onSubmit(response.data))
            .catch(error => console.error(error))
    }

    componentWillMount() {
        axios.get(`/api/cities`)
            .then(response => {
                this.setState({city_id: response.data[0].id});
                this.props.dispatch(getCities(response.data))
            })
            .catch(error => console.error(error));
        axios.get(`/api/users`)
            .then(response => {
                this.setState({user_id: response.data.find((user) => user.city_id === this.state.city_id).id});
                this.props.dispatch(getUsers(response.data))
            })
            .catch(error => console.error(error));
        axios.get(`/api/addresses`)
            .then(response => this.props.dispatch(getAddresses(response.data)))
            .catch(error => console.error(error));
        axios.get(`/api/products`)
            .then(response => this.props.dispatch(getProducts(response.data)))
            .catch(error => console.error(error));
    }

  render() {
    return (
      <Row className={'justify-content-md-center'}>
        <Col lg={8} lgOffset={2}>
          {!this.props.order &&
            <form onSubmit={this.handleSubmit}>
                <FieldGroup name="sender" label="Имя отправителя" id="senderName" data-attr="name"
                  onChange={this.handleChange} type="text" required />
                <MaskedGroup name="sender" label="Телефон отправителя" id="senderPhone" data-attr="phone"
                  onChange={this.handleChange} required />
                <FieldGroup name="receiver" label="Имя получателя" id="receiverName" data-attr="name"
                  onChange={this.handleChange} type="text" required />
                <MaskedGroup name="receiver" label="Телефон получателя" id="receiverPhone" data-attr="phone"
                  onChange={this.handleChange} required />
                <FieldGroup name="city_id" label="Город" id="citySelect"
                  collection={this.props.cities} onChange={this.handleChange} componentClass="select" />
                <FieldGroup name="user_id" label="Наименование исполнителя" id="userSelect"
                  collection={filter(this.props.users, (user) => user.city_id === this.state.city_id)}
                  onChange={this.handleChange} componentClass="select" />
                <FieldGroup name="address_id" label="Адрес исполнителя" id="addressSelect"
                  collection={filter(this.props.addresses, (address) => address.user_id === this.state.user_id)}
                  onChange={this.handleChange} componentClass="select" />
                <FieldGroup name="product_id" label="Продукт" id="productSelect"
                  collection={filter(this.props.products, (product) => product.user_id === this.state.user_id)}
                  onChange={this.handleChange} componentClass="select" />
                <Button bsStyle="primary" type="submit">Отправить</Button>
              </form>
          }
          {this.props.order &&
              <div>
                  <br/>
                  <Jumbotron>
                      <h1 className={'text-center'}>{this.props.order.code}</h1>
                  </Jumbotron>
                  <Button bsStyle="primary" type="submit" onClick={this.props.resetOrder}>Новый заказ</Button>
              </div>
          }
        </Col>
      </Row>
    );
  }
}
