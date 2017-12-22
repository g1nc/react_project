import React from 'react'
import axios from 'axios';
import { contains } from 'underscore'
import {
  Row,
  Col,
  Button,
  FormGroup,
  ControlLabel,
  FormControl
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
      <MaskedInput {...props} mask="+7 (978) 1111111" type="text" className={'form-control'}>
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
      supplier_id:    '',
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
  }

  fetchCollection(name, params = '') {
    axios.get(`api/${name}?${params}`)
      .then(response => {
        var state = {}
        state[name] = response.data
        if(contains(['cities', 'users'], name)) {
          this.reloadData(name, response.data[0].id)
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

  render() {
    return (
      <Row>
        <Col lg={8} lgOffset={2}>
          <form onSubmit={this.handleSubmit}>
            <FieldGroup
              name="sender_name"
              label="Имя отправителя"
              id="senderName"
              type="text" />
            <PhoneGroup
              name="sender_phone"
              label="Телефон отправителя"
              id="senderPhone"/>
            <FieldGroup
              name="receiver_name"
              label="Имя получателя"
              id="receiverName"
              type="text" />
            <PhoneGroup
              name="receiver_phone"
              label="Телефон получателя"
              id="receiverPhone" />
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
            <FieldGroup
              name="product_id"
              label="Продукт"
              id="productSelect"
              componentClass="select"
              collection={this.state.products}
              onChange={this.handleChange} />
            <Button bsStyle="primary" type="submit">Отправить</Button>
            {this.state.code && <Jumbotron>
              <h1>{this.state.code}</h1>
            </Jumbotron>}
          </form>
        </Col>
      </Row>
    );
  }
}

//     <div class="form-group">
//       <label for="order_address_id">Адрес исполнителя</label>
//       <%= f.collection_select(:address_id, Address.all, :id, :value, {}, { class: 'form-control', required: true }) %>
//     </div>

//     <div class="form-group">
//       <label for="order_product_id">Продукт</label>
//       <%= f.collection_select(:product_id, Product.all, :id, :name, {}, { class: 'form-control', required: true }) %>
//     </div>

//     <%= f.submit 'Отправить', class: 'btn btn-primary' %>
//   <% end %>
// </div> -->
