import React from 'react'
import axios from 'axios'
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

export default class UserSignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
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
    var auth_params = {
      user: {
        email: this.state.email,
        password: this.state.password
      },
      authenticity_token: this.getMetaContent("csrf-token")
    }
    var self = this;
    axios.post('/users/sign_in.json', auth_params)
      .then(function (response) {
        location.reload();
      })
      .catch(error => {
        console.error(error)
      })
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
          <form onSubmit={this.handleSubmit}>
            <FieldGroup name="email" label="Email" id="email"
                        type="email" onChange={this.handleChange} required />
            <FieldGroup name="password" label="Пароль" id="password"
                        type="password" onChange={this.handleChange} required />
            <Button bsStyle="primary" type="submit">Отправить</Button>
          </form>
        </Col>
      </Row>
    );
  }
}
