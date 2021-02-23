import { useHistory } from 'react-router-dom';
import FormLayout from '../../FormLayout';
import ContainerLayer from '../../components/ContainerLayer';
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
    <ContainerLayer
      title='Add User'
      className={prefix}
      h1Content='New User'
    >
      <FormLayout onFinish={handleCreateUser} submitText='Add New User'/>
    </ContainerLayer>
  );
}