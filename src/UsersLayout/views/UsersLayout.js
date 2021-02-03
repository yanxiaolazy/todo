import { Empty, Skeleton, Button, Spin } from "antd";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { viewUsersApi, deleteUserApi } from "../../utils/api";
import "./style.css";

const prefix = 'users-layout';

const resolveViewLayout = (setAllUsers, setLoading) => response => {
  if (typeof setAllUsers !== 'function') return;
  if (!response.params) return;
  setAllUsers(response.params.users);
  setLoading(false);
}

const rejectViewLayout = setLoading => error => {
  setLoading(false);
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
        [viewList, setViewList] = useState(null)


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

  if (loading) {
    return(<Skeleton className={`${prefix}`} active loading round paragraph={{rows: 6}}/>)
  }

  if (!allUsers) {
    return(<Empty className={`${prefix} animate-bottom`}/>);
  }

  return(
    <div className={`${prefix} animate-bottom`}>
      <div className={`${prefix}-create-btn`}><Button type='primary' htmlType='button' onClick={handleCreateUserBtn}>Add New</Button></div>
      <ul className={`${prefix}-titles`}>
        <li>ID</li>
        <li>UserName</li>
        <li>Email</li>
        <li>Role</li>
      </ul>
      <Spin spinning={spinning}>
        <ul className={`${prefix}-items`}>
          {viewList}
        </ul>
      </Spin>
    </div>
  );
}