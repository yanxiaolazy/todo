import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { notification } from "antd";

import FormLayout from "../../FormLayout";
import ContainerLayer from "../../components/ContainerLayer";

import { viewUsersApi, updateUserApi } from "../../utils/api";
import { getUser } from "../../utils/parse";
import { regExpConfig } from '../../utils/regular';

const prefix = 'setting-layout';

const resolveSettingLayout = (setUser, setLoading) => response => {
  const {params} = response;

  if (params.users) {
    setUser(params.users);
  }

  setTimeout(setLoading, 500, false);
}
const rejectSettingLayout = setLoading => () =>  setTimeout(setLoading, 500, false);

const resolveUpdateUser = (history, setSpinning) => response => {
  notification.success({message: 'Profile updated', description: response.params.text, placement: 'topLeft'});
  history.push('/setting');
  setTimeout(() => {
    setSpinning(false);
  }, 500);
}
const rejectUpdateUser = setSpinning => () => setSpinning(false);

export default function SettingLayout() {
  const [user, setUser] = useState(null);
  const [spinning, setSpinning] = useState(false),
        history = useHistory(),
        [disabled, setDisabled] = useState(false),
        [loading, setLoading] = useState(true)

  useEffect(() => {
    viewUsersApi({params: {tab: getUser()}})()(resolveSettingLayout(setUser, setLoading), rejectSettingLayout(setLoading));
  }, []);

  function updateUser(values) {
    const {password} = values;
    if (password) {
      setSpinning(true);
      setDisabled(true);
      updateUserApi()({user: values})(resolveUpdateUser(history, setSpinning), rejectUpdateUser(setSpinning));
    } else {
      notification.warning({message: '', description: 'Please input password before submitting', placement: 'topLeft'});
    }
  }

  let passwordRules = [
    {message: '长度必须在6-16之间', min: 6, max: 16},
    {pattern: regExpConfig.strongPwd3, message: '必须是字母和数字的组合，可以使用特殊字符，长度在6-16之间'}
  ];

  return(
    <ContainerLayer 
      className={`${prefix}`}
      title='Setting'
      h1Content='Setting'
      {...{loading, spinning}}
    >
      <FormLayout 
        submitText='Update Profile' 
        usernameDisabled 
        initialValues={user} 
        onFinish={updateUser} 
        {...{passwordRules, disabled}}
      />
    </ContainerLayer>
  );
}


