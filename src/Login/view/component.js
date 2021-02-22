import { Button, Checkbox, Form, Input, Spin } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import Helmet from "../../components/Helmet";
import './style.css';

const FormItem = Form.Item;

export default function Login({loading, onFinish}) {

  return(
    <div className='login'>
      <Helmet title='Login' />
      <QueueAnim delay={300} type='bottom'>
        <Spin spinning={loading} key='login'>
          <Form 
            className='form-container' 
            labelCol={{span: 18}} 
            onFinish={onFinish}
            scrollToFirstError
            initialValues={{remember: false}}
          >
            <FormItem
              name='username'
              rules={[{required:true}]}
            >
              <Input autoFocus prefix={<UserOutlined />} placeholder='请输入用户名' type='text'/>
            </FormItem>
            <FormItem
              name='email'
              rules={[{required: true}]}
            >
              <Input prefix={<MailOutlined />} type='email' placeholder='请输入邮箱'/>
            </FormItem>
            <FormItem
              name='password'
              rules={[{required: true}]}
            >
              <Input.Password prefix={<LockOutlined />} type='password' placeholder='请输入密码'/>
            </FormItem>
            <FormItem
              name='remember'
              valuePropName='checked'
            >
              <Checkbox>Remember</Checkbox>
            </FormItem>
            <FormItem
              wrapperCol={{offset: 19}}
            >
              <Button type='primary' htmlType='submit'>登录</Button>
            </FormItem>
          </Form>
          </Spin>
      </QueueAnim>
    </div>
  );
}