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
import CreateProject from "./CreateProject";
import Home from './Home';
import { getAdmin, getToken } from "./utils/parse";

const LayoutHeader = Layout.Header,
      LayoutSider = Layout.Sider,
      LayoutContent = Layout.Content;

const styles = {
  header: {
    background: 'rgb(112, 182, 115)',
    color: '#fff',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 999
  },
  sider: {
    minHeight: 'calc(100vh - 64px)',
    position: 'fixed',
    left: 0,
    top: 64,
    overflow: 'auto',
    zIndex: 999
  },
  content: {
    background: '#f6f6f6',
    marginLeft: '200px',
    marginTop: '64px',
    minHeight: 'calc(100vh - 64px)'
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
              <Route exact path='/' component={Home}/>
              <Route exact path='/new' component={CreateProject} />
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
