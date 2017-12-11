import React, { Component } from 'react';
import logo from './media/icon.png';
import './App.css';
import { Layout, Menu, Breadcrumb, Row, Col, Button} from 'antd';
import Record from './Record.js';
const { Header, Content, Footer } = Layout;

class App extends Component {
  state = {
      menuName : '出入登记',
  }
  handleClick = (e) => {
      this.setState({
          menuName : e.item.props.children
      });
  }
  render() {
    return (
      <Layout className="layout">
        <Header>
          <Row>
            <Col span={2}>
              <img className='logo' src={logo} alt=''/>
            </Col>
            <Col span={22}>

              <Menu
                onSelect = {this.handleClick}
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
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

          <Breadcrumb style={{ margin: '16px 0',float: 'left' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.menuName}</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{float: 'right',margin: '10px 0'}}>
            <Button type="primary" className="btn">外出登记</Button>
            <img className='erweima' src={logo} />
          </div>
          <div style={{clear: 'both'}}></div>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Record  menuName={this.state.menuName}/>
          </div>

        </Content>
        <Footer style={{bottom:0}}>
          东胜区气象局 ©2017 Created by Traveler Lab
        </Footer>
      </Layout>
    );
  }
}

export default App;
