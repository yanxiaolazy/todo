import { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import QueueAnim from "rc-queue-anim";
import Login, { actions as loginAction } from "./Login";
import EditProject from "./EditProject";
import TopBar from './TopBar';
import SideBar from "./SideBar";

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

function App({loginStatus, dispatch}) {
  const history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    if (!token) {
      history.push('/login');
    } else {
      dispatch(loginAction.setLoginStatus(true));
    }
  }, [history, loginStatus, dispatch]);

  return (
    <>
      {loginStatus && 
      <Layout >
        <LayoutHeader style={styles.header}>
          <QueueAnim type='top' delay='100'>
            <TopBar key='topbar'/>
          </QueueAnim>
        </LayoutHeader>
        <Layout>
          <LayoutSider theme='light' style={styles.sider}>
            <QueueAnim type='left' delay='100'>
              <SideBar key='sider'/>
            </QueueAnim>
          </LayoutSider>
          <LayoutContent style={styles.content}>
            <QueueAnim type='bottom' delay='150'>
              <Switch key='content'>
                <Route exact path='/' />
                <Route path='/new' component={EditProject} />
                {/* <Route component={NotFound} /> */}
              </Switch>
            </QueueAnim>
          </LayoutContent>
        </Layout>
      </Layout>}
      <Route path='/login' component={Login}/>
    </>
  );
}

function mapStateToProps(state, ownProps) {
  return {
    loginStatus: state.login.loginStatus
  }
}

export default connect(mapStateToProps)(App);
