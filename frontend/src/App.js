import React, { Component } from 'react';
import logo from './media/icon.png';
import qrcode from './media/erweima.png';
import './App.css';
import { Layout, Menu, Breadcrumb, Row, Col, Button, Modal } from 'antd';
import Record from './Record.js';
const { Header, Content, Footer } = Layout;
const info = Modal.info;

class App extends Component {
  state = {
      menuName : '出入登记',
  }
  handleClick = (e) => {
      this.setState({
          menuName : e.item.props.children
      });
  }
  showQrcode(){
      info({
        title:'',
        content:(<div style={{height:'100%',width:'100%'}}><img className='erweima' src={qrcode} alt=''/></div>),
        iconType:'',
        width:'300px',
        maskClosable:'true',
        okText:'好的'
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
          <div style={{float: 'right',margin: '10px 0',position:'relative'}} className='btn'>
            <Button type="primary" onClick={() => {this.showQrcode()}}>外出登记</Button>
          </div>
          <div style={{clear: 'both'}}></div>
          <div style={{ background: '#fff', padding: 24, minHeight: 1700}}>
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
