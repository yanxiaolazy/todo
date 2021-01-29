import { Button, Checkbox, Form, Input, Spin } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import {regExpConfig} from "../../utils/regular";
import './style.css';

const FormItem = Form.Item;

export default function Login({loading, onFinish}) {

  return(
    <div className='login'>
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
              rules={[
                {
                  required:true,
                  min: '5',
                  max: '16',
                  message: '必须以字母开头，允许5-16字节，允许字母数字下划线'
                },
                {
                  pattern: regExpConfig.account,
                  message: '必须以字母开头，允许5-16字节，允许字母数字下划线'
                }
              ]}
            >
              <Input autoFocus prefix={<UserOutlined />} placeholder='请输入用户名' type='text'/>
            </FormItem>
            <FormItem
              name='email'
              rules={[{required: true, message: '请输入正确的邮箱'}]}
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