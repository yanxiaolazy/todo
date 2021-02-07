import { Skeleton, Spin, notification } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import FormLayout from "../../FormLayout";
import Helmet from "../../components/Helmet";
import { viewUsersApi, updateUserApi } from "../../utils/api";
import { getUser } from "../../utils/parse";
import { regExpConfig } from '../../utils/regular';

const prefix = 'setting-layout';

const resolveSettingLayout = setUser => response => {
  const {params} = response;

  if (params.users) {
    setUser(params.users);
  }
}

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
        [disabled, setDisabled] = useState(false)

  useEffect(() => {
    viewUsersApi({params: {tab: getUser()}})()(resolveSettingLayout(setUser))
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

  if (!user) {
    return(<Skeleton className={`${prefix}`} active round paragraph={{rows: 6}}/>)
  }

  return(
    <div className={`${prefix}`}>
      <Helmet title='Setting' />
      <h1 className='todo-title'>Setting</h1>
      <Spin {...{spinning}}>
        <FormLayout 
          submitText='Update Profile' 
          usernameDisabled 
          initialValues={user} 
          onFinish={updateUser} 
          {...{passwordRules, disabled}}
        />
      </Spin>
    </div>
  );
}


