import React, { Component } from 'react';
import { Form, DatePicker, Input, Col, Button, message } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class InAndOutRecordForm extends Component {
  handleSearch = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const record_date = 'record_date=' + fieldsValue['record_date'].format('YYYY-MM-DD');
      const out_time = '&out_time=' + fieldsValue['out_time'].format('YYYY-MM-DD HH:mm:ss');
      const back_time = '&back_time=' + fieldsValue['back_time'].format('YYYY-MM-DD HH:mm:ss');
      const user_name = '&user_name=' + fieldsValue['user_name'];
      const car = '&car=' + fieldsValue['car'];
      const remark = '&remark=' + fieldsValue['remark'];
      const values = record_date + out_time + back_time + user_name + car + remark;

      fetch('http://localhost:86/opw/demo.php', {method: "POST",
                mode: "cors",
                headers:{  
                    'Content-Type': 'application/x-www-form-urlencoded'  
                },  
                body: values}).then(function(response) {  
                  if(response.status === 200){
                      message.success('成功');
                  }else{
                      message.error('失败');
                      return;
                  }
            },function(error){   
               console.log('error: ', error);
            })
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const config = {
      rules: [
      {required: true, message: '该项为必输项!' }]
    };
      return (
          <form onSubmit={this.handleSearch}>
            <FormItem
              {...formItemLayout}
              label="日期">
              {getFieldDecorator('record_date', config)(
                <DatePicker showTime/>
              )}
            </FormItem>
            <FormItem 
              {...formItemLayout} 
              label="姓名">
              {getFieldDecorator('user_name',config)(
                <Col style={{display:'block',width:'154px'}}>
                  <Input placeholder="请输入您的姓名"/>
                </Col>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="外出时间">
              {getFieldDecorator('out_time', config)(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="归来时间">
              {getFieldDecorator('back_time', config)(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )}
            </FormItem>
            <FormItem 
                {...formItemLayout} 
                label="公车">
                {getFieldDecorator('car',config)(
                  <Col style={{display:'block',width:'154px'}}>
                    <Input />
                  </Col>
                )}
              </FormItem>
              <FormItem 
                {...formItemLayout} 
                label="事由">
                {getFieldDecorator('remark',config)(
                  <Col style={{display:'block',width:'154px'}}>
                    <TextArea placeholder="请输入" autosize={{ minRows: 3, maxRows: 6 }} />
                  </Col>
                )}
              </FormItem>
              <FormItem 
                wrapperCol={{
                  xs: { span: 24, offset: 0 },
                  sm: { span: 16, offset: 10 },
                }}>
                <Button type="primary" htmlType="submit" size="small">提交</Button>
              </FormItem>
          </form>
      );
  }
}

const InAndOutRecord = Form.create()(InAndOutRecordForm);

export default InAndOutRecord;





