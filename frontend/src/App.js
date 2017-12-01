import React, { Component } from 'react';
import logo from './media/icon.png';
import './App.css';
import { Layout, Menu, Breadcrumb, Row, Col} from 'antd';
const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Row>
            <Col span={2}>
              <img className='logo' src={logo} />
            </Col>
            <Col span={22}>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['2']}
                style={{ lineHeight: '64px' }}
              >
                <Menu.Item key="1">出入登记</Menu.Item>
                <Menu.Item key="2">财务公开</Menu.Item>
                <Menu.Item key="3">政务公开</Menu.Item>
                <Menu.Item key="4">业务公开</Menu.Item>
              </Menu>
            </Col>
          </Row>
        </Header>
        <Content>

          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>出入登记</Breadcrumb.Item>
          </Breadcrumb>

          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
          
        </Content>
        <Footer>
          东胜区气象局 ©2017 Created by Traveler Lab
        </Footer>
      </Layout>
    );
  }
}

export default App;
