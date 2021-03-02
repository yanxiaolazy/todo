import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';

import FormLayout from '../../FormLayout';
import ContainerLayer from '../../components/ContainerLayer';

import { newUserApi } from '../../utils/api';
import { getAdmin } from '../../utils/parse';

const prefix = 'create-user';

const resolveCreateUser = (history, setSpinning) => response => {
  if (response.params) {
    notification.success({message: response.params.info, placement: 'topLeft'});
    history.push('/user');
  }
  setTimeout(setSpinning, 500, false);
}

export default function CreateUser() {
  const history = useHistory(),
        [spinning, setSpinning] = useState(false),
        [isAdmin] = useState(getAdmin)

  function handleCreateUser(values) {
    setSpinning(true);
    newUserApi()({user: values})(resolveCreateUser(history, setSpinning), () => setTimeout(setSpinning, 500, false));
  }

  return(
    <ContainerLayer
      title='Add User'
      className={prefix}
      h1Content='New User'
      {...{spinning}}
    >
      <FormLayout {...{isAdmin}} onFinish={handleCreateUser} submitText='Add New User'/>
    </ContainerLayer>
  );
}