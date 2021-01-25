import { connect } from "react-redux";
import Login from "./component";
import * as actions from "../actions";
import {loginApi} from "../../utils/api";
import { setKeyValue, setUser } from "../../utils/parse";

function mapStateToProps(state, ownProps) {
  return {
    loginStatus: state.login.loginStatus,
    loading: state.login.loading
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {history} = ownProps;
  
  const resolve = response => {
    const {params} = response;

    dispatch(actions.setLoading(false));
    dispatch(actions.setLoginStatus(true));
    setKeyValue('todo-token', params.token);
    setKeyValue('todo-admin', params.admin);
    history.push('/');
  }
  const reject = () => {
    dispatch(actions.setLoading(false));
    dispatch(actions.setLoginStatus(false));
    dispatch(actions.setUserValue(null));
  }

  return {
    onFinish(value) {
      setUser('todo-login', value);
      dispatch(actions.setLoading(true));
      dispatch(actions.setUserValue(value));
      loginApi()({login: value})(resolve, reject);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);