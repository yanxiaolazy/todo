import { Button } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ContainerLayer from "../../components/ContainerLayer";
import { viewUsersApi, deleteUserApi } from "../../utils/api";
import "./style.css";

const prefix = 'users-layout';

const resolveViewLayout = (setAllUsers, setLoading) => response => {
  if (typeof setAllUsers !== 'function') return;
  if (!response.params) return;
  setAllUsers(response.params.users);
  setTimeout(setLoading, 500, false);
}

const rejectViewLayout = setLoading => error => {
  setTimeout(setLoading, 500, false);
}

const resolveDeleteUser = (id, setViewList, setSpinning) => () => {
  setViewList(prev => {
    const next = prev.map(m => {
      if (!m) return null;
      if (m.key === id) {
        return null
      }
      return m;
    });

    return Array.from(new Set(next));
  });
  setSpinning(false);
}
const rejectDeleteUser = setSpinning => () => {
  setSpinning(false);
}

export default function UsersLayout() {
  const [allUsers, setAllUsers] = useState(null),
        [loading, setLoading] = useState(true),
        history = useHistory(),
        [spinning, setSpinning] = useState(false),
        [viewList, setViewList] = useState(null),
        [isEmpty, setIsEmpty] = useState(true)


  useEffect(() => {
    viewUsersApi()()(resolveViewLayout(setAllUsers, setLoading), rejectViewLayout(setLoading));
  }, []);

  useEffect(() => {
    if (allUsers) {
      const views = allUsers.map(user => {
        return(
          <li key={user.id} className={`${prefix}-item`}>
            <span>{user.id}</span>
            <span>{user.username}</span>
            <span>{user.email}</span>
            <span>{user.admin === true ? 'Administrator' : 'Editor'}</span>
            {user.admin !== true && <span className={`${prefix}-delete`} id={user.id} onClick={handleDeleteUser}>删除</span>}
          </li>
        );
      });
      setIsEmpty(false);
      setViewList(views);
    }
  }, [allUsers])

  function handleCreateUserBtn() {
    history.push('/user/create-user');
  }

  function handleDeleteUser(e) {
    setSpinning(true);
    const target = e.target;
    deleteUserApi({params: {id: target.id}})()(resolveDeleteUser(target.id, setViewList, setSpinning), rejectDeleteUser(setSpinning));
  }

  return(
    <ContainerLayer
      title='Users'
      h1Content='Users'
      className={prefix}
      {...{spinning, loading, isEmpty}}
    >
      <div className={`${prefix}-create-btn`}><Button type='primary' htmlType='button' onClick={handleCreateUserBtn}>Add New</Button></div>
      <div className='animate-bottom'>
        <ul className={`${prefix}-titles`}>
          <li>ID</li>
          <li>UserName</li>
          <li>Email</li>
          <li>Role</li>
        </ul>
        <ul className={`${prefix}-items`}>
          {viewList}
        </ul>
      </div>
    </ContainerLayer>
  );
}