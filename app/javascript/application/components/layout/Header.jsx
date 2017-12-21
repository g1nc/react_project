import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey) {
    this.setState({ selected: selectedKey })
  }

  render() {
    return(
      <div className={'header clearfix'}>
        <nav style={{ marginTop: '0.4rem' }}>
          <ul className={'nav nav-pills float-right'}>
            <li className={'nav-item'}>
              <Link to='/' className={'nav-link'}>Главная</Link>
            </li>
            <li className={'nav-item'}>
              <Link to='/users' className={'nav-link'}>Исполнители</Link>
            </li>
            <li className={'nav-item'}>
              <Link to='/orders' className={'nav-link'}>Заказы</Link>
            </li>
            <li className={'nav-item'}>
              <Link to='/orders/code' className={'nav-link'}>Код</Link>
            </li>
            <li className={'nav-item'}>
              <Link to='/users/sign_in' className={'nav-link'}>Войти</Link>
            </li>
          </ul>
        </nav>
        <h3 className={'text-muted'}>Project name</h3>
      </div>
    )
  }
}
