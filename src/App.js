import { useEffect, useState } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Layout } from 'antd';
import Login, { actions as loginAction } from "./Login";
import EditProject from "./EditProject";
import TopBar from './TopBar';
import SideBar from "./SideBar";
import ProjectSummary from "./ProjectSummary";
import ViewProject from './ViewProject';
import UsersLayout from "./UsersLayout";
import CreateUser from "./CreateUser";
import SettingLayout from "./SettingLayout";
import { getAdmin, getToken } from "./utils/parse";

const LayoutHeader = Layout.Header,
      LayoutSider = Layout.Sider,
      LayoutContent = Layout.Content;

const styles = {
  header: {
    background: 'rgba(112, 182, 115, .8)',
    color: '#fff'
  },
  sider: {
    minHeight: 'calc(100vh - 64px)'
  },
  content: {
    background: '#f6f6f6'
  }
}

function App() {
  const history = useHistory(),
        match = useRouteMatch(),
        dispatch = useDispatch(),
        loginStatus = useSelector(state => state.login.loginStatus),
        [isAdmin] = useState(() => getAdmin());

  useEffect(() => {
    const token = getToken();
    
    if (!token) {
      if (window.location.pathname !== '/login') {
        history.push('/login');
      }
    } else {
      dispatch(loginAction.setLoginStatus(true));
    }
  }, [history, loginStatus, dispatch, match]);

  return (
    <>
      {loginStatus && 
      <Layout >
        <LayoutHeader style={styles.header}>
          <TopBar key='topbar'/>
        </LayoutHeader>
        <Layout>
          <LayoutSider theme='light' style={styles.sider}>
            <SideBar key='sider'/>
          </LayoutSider>
          <LayoutContent style={styles.content}>
            <Switch key='content'>
              <Route exact path='/' />
              <Route exact path='/new' component={EditProject} />
              <Route exact path='/view' component={ProjectSummary} />
              <Route exact path='/view/:projectId(\d+)/edit' render={props => <EditProject isEdit={true} {...props}/>} />
              <Route path='/view/:projectId(\d+)' component={ViewProject} />
              <Route exact path='/setting' component={SettingLayout} />
              {isAdmin && <>
                <Route exact path='/user' component={UsersLayout} />
                <Route exact path='/user/create-user' component={CreateUser} />
              </>}
              {/* <Route component={NotFound} /> */}
            </Switch>
          </LayoutContent>
        </Layout>
      </Layout>}
      <Route path='/login' component={Login}/>
    </>
  );
}

export default App;
