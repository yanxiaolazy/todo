import { LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import { useHistory } from 'react-router-dom';
import { newUserApi } from '../../utils/api';
import { regExpConfig } from '../../utils/regular';
import "./style.css";

const FormItem = Form.Item;
const prefix = 'create-user';
const wrapperCol = {
  offset: 2
}

const resolveCreateUser = history => response => {
  if (response.params) {
    history.push('/user');
  }
}

export default function CreateUser() {
  const history = useHistory();

  function handleCreateUser(values) {
    newUserApi()({user: values})(resolveCreateUser(history));
  }

  return(
    <div className={`${prefix} animate-bottom`}>
      <Form
        className={`${prefix}-form`}
        labelCol={{span: 4}}
        onFinish={handleCreateUser}
      >
        <FormItem
          label='Username'
          name='username'
          {...{wrapperCol}}
          rules={[
            {
              required: true,
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
          <Input type='text' autoFocus prefix={<UserOutlined />} placeholder='请输入用户名' />
        </FormItem>
        <FormItem
          label='Email'
          name='email'
          {...{wrapperCol}}
          rules={[{required: true, message: '请输入正确的邮箱'}]}
        >
          <Input type='email' prefix={<MailOutlined />} placeholder='请输入用户邮箱'/>
        </FormItem>
        <FormItem
          label='Password'
          name='password'
          {...{wrapperCol}}
          rules={[
            {required: true, message: '长度必须在6-16之间', min: 6, max: 16},
            {pattern: regExpConfig.strongPwd3, message: '必须是字母和数字的组合，可以使用特殊字符，长度在6-16之间'}
          ]}
        >
          <Input.Password type='password' prefix={<LockOutlined/>} placeholder='请输入用户密码'/>
        </FormItem>
        <FormItem>
          <Button type='primary' htmlType='submit'>Add New User</Button>
        </FormItem>
      </Form>
    </div>
  );
}