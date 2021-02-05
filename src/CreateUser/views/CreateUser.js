import { useHistory } from 'react-router-dom';
import FormLayout from '../../FormLayout';
import { newUserApi } from '../../utils/api';

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
    <FormLayout onFinish={handleCreateUser} submitText='Add New User'/>
  );
}