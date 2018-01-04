import React from 'react'
import axios from 'axios'
import { Row, Col, Button, } from 'react-bootstrap'
import { FieldGroup } from "../layout/FormGroups";
import { getMetaContent } from "../../helpers";

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
    let state = {};
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    let self = this;
    let auth_params = {
        user: {
            email:    this.state.email,
            password: this.state.password
        },
        authenticity_token: getMetaContent('csrf-token')
    };
    axios.post('/users/sign_in.json', auth_params)
        .then(function (response) {
            self.props.getUser(response.data);
            location.reload();
        })
        .catch(error => {
            console.error(error)
        })
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
