import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Alert, Row, Col, NavDropdown } from 'react-bootstrap'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    // alert:     props.alertMessage,
    // notice:    props.noticeMessage,
    this.state = {
      selected:  0,
      alert:     '',
      notice:    '',
      signed_in: false,
      user:      null
    };

    this.handleSelect = this.handleSelect.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    var self = this
    axios.get('/auth/signed_in')
      .then(function (response) {
        self.setState(response.data);
      })
      .catch(error => {
        console.error(error)
      })
  }

  handleSelect(selectedKey) {
    this.setState({ selected: selectedKey })
  }

  signOut() {
    var instance = axios.create({
      headers: {'X-CSRF-Token': this.getMetaContent("csrf-token")}
    });
    instance.delete('/users/sign_out.json', {
        authenticity_token: this.getMetaContent("csrf-token")
      })
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
    return(
      <div>
        <div className={'header clearfix'}>
          <nav style={{ marginTop: '0.4rem' }}>
            <ul className={'nav nav-pills float-right'}>
              <li className={'nav-item'}>
                <Link to='/' className={'nav-link'}>Главная</Link>
              </li>
              {this.state.user && this.state.user.role == "admin" &&
              <li className={'nav-item'}>
                <Link to='/users' className={'nav-link'}>Исполнители</Link>
              </li>}
              {this.state.user && this.state.user.role == "admin" &&
              <li className={'nav-item'}>
                <Link to='/orders' className={'nav-link'}>Заказы</Link>
              </li>}
              <li className={'nav-item'}>
                <Link to='/orders/code' className={'nav-link'}>Код</Link>
              </li>
              {!this.state.signed_in && <li className={'nav-item'}>
                <Link to='/users/sign_in' className={'nav-link'}>Войти</Link>
              </li>}
              {this.state.signed_in && <li className={'nav-item'}>
                <a href="#" className={'nav-link'} onClick={this.signOut}>Выйти</a>
              </li>}
            </ul>
          </nav>
          <h3 className={'text-muted'}>Project name</h3>
        </div>
        {this.state.alert && <Row>
          <Col lg={8} className={'offset-lg-2'}>
            <Alert bsStyle="danger" style={{
              marginTop: '1rem',
              marginBottom: '0'
            }}>
              {this.state.alert}
            </Alert>
          </Col>
        </Row>}
        {this.state.notice && <Row>
          <Col lg={8} className={'offset-lg-2'}>
            <Alert bsStyle="notice" style={{
              marginTop: '1rem',
              marginBottom: '0'
            }}>
              {this.state.notice}
            </Alert>
          </Col>
        </Row>}
      </div>
    )
  }
}
