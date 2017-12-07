import React, { Component } from 'react';
import { Table } from 'antd';
const { Column } = Table;

class Record extends Component { 
	state = {
		datas: [],
	}
	componentDidMount(){
		let menuName = this.props.menuName;
		this.getInfo(menuName);
		this.timer1 = setInterval(()=>{
	        fetch("./html/file_list.json").then((responce) => {
	          return responce.json();
	        }).then((data) => {
	          this.setState({
	            datas: data[menuName],
	          });
	        }).catch((error) => {
	          console.log('request faild:', error);
	        })
      },900000);
	}
	componentWillReceiveProps(nextProps){
		let menuName = nextProps.menuName;
		this.getInfo(menuName);
	}
	getInfo(menuName){
		fetch("html/file_list.json").then((responce) => {
				return responce.json();
		    }).then((data) => {
		      this.setState({
		        datas: data[menuName],
		      });
		    })
	}
	// componentWillUnmount(
	// 	this.timer1 && clearInterval(this.timer1);
	// )；
	render (){
		return (
			  <Table size="small" dataSource={this.state.datas}>
			    <Column
			      title="文件"
			      dataIndex = "key"
			      key="key"
			    />
			  </Table>	
		);
	}
}

export default Record;