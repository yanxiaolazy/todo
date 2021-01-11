import { connect } from "react-redux";
import Login from "./component";
import * as actions from "../actions";
import {loginApi} from "../../utils/api";

function mapStateToProps(state, ownProps) {
  return {
    loginStatus: state.login?.loginStatus
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {history} = ownProps;
  
  const resolve = (token) => {
    dispatch(actions.setLoginStatus(true));
    sessionStorage.setItem('token', JSON.stringify(token))
    history.push('/');
  }
  const reject = () => {
    dispatch(actions.setLoginStatus(false));
    dispatch(actions.setUserValue(null));
  }

  return {
    onFinish(value) {
      dispatch(actions.setLoginStatus(true));
      dispatch(actions.setUserValue(value));
      loginApi()({login: value})(resolve, reject);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);