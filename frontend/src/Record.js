import React, { Component } from 'react';
import { Table, Modal} from 'antd';
import recordStyle from './Record.css';
const { Column } = Table;
const info = Modal.info;

class Record extends Component { 
	state = {
		datas: [],
	}
	showModal(name,key){
	    info({
	    	title:name,
	    	content:(<div styke={{height:'100%',width:'100%'}}>
		          	<iframe title={name} src={key} style={{width:'100%',border:'0',marginwidth:'0',marginheight:'0',frameborder:'no'}}></iframe></div>),
	    	iconType:''
	    });
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
			<div>
			  <Table size="small" dataSource={this.state.datas}>
			    <Column
			      title="文件"
			      dataIndex = "key"
			      key="name"
			      render={(text, record) => (
			        <span>
			          <a href="#" onClick={()=>this.showModal(record.name,record.key)}>{record.name}</a>
			        </span>
			      )}
			    />
			  </Table>
			</div>
		);
	}
}

export default Record;