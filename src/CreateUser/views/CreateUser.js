import { useHistory } from 'react-router-dom';
import FormLayout from '../../FormLayout';
import Helmet from "../../components/Helmet";
import { newUserApi } from '../../utils/api';
import { notification } from 'antd';

const prefix = 'create-user';

const resolveCreateUser = history => response => {
  if (response.params) {
    notification.success({message: response.params.info, placement: 'topLeft'});
    history.push('/user');
  }
}

export default function CreateUser() {
  const history = useHistory();

  function handleCreateUser(values) {
    newUserApi()({user: values})(resolveCreateUser(history));
  }

  return(
    <div className={`${prefix}`}>
      <Helmet title='Add User'/>
      <h1 className='todo-title'>New User</h1>
      <FormLayout onFinish={handleCreateUser} submitText='Add New User'/>
    </div>
  );
}