import { connect } from "react-redux";
import Login from "./component";
import * as actions from "../actions";
import {loginApi} from "../../utils/api";
import { setToken, setLogin, setAdmin } from "../../utils/parse";

function mapStateToProps(state) {
  return {
    loading: state.login.loading
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {history} = ownProps;
  
  const resolve = response => {
    const {params} = response;

    setTimeout(() => {
      dispatch(actions.setLoading(false));
      dispatch(actions.setLoginStatus(true));
    }, 500);
    setToken(params.token);
    setAdmin(params.admin);
    history.push('/');
  }
  const reject = () => {
    dispatch(actions.setLoading(false));
    dispatch(actions.setLoginStatus(false));
    dispatch(actions.setUserValue(null));
  }

  return {
    onFinish(value) {
      const {password, ...other} = value;
      setLogin(other);
      dispatch(actions.setLoading(true));
      dispatch(actions.setUserValue(other));
      loginApi()({login: value})(resolve, reject);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);