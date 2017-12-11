import React from 'react'
import {Layout, Menu} from 'antd';
const {Header, Content, Footer} = Layout;

class App extends React.Component {
  render() {
    return (
    <Layout className="layout">
      <Header>
        <div className="logo"/>
        <Menu theme="dark" mode="horizontal" style={{
          lineHeight: '64px',
          float: 'right'
        }}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div style={{
            background: '#fff',
            padding: 24,
            minHeight: 280,
            marginTop: 24
          }} id="app_content" />
      </Content>
    </Layout>)
  }
}

export default App
