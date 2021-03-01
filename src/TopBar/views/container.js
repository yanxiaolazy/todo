import { connect } from "react-redux";
import TopBar from  './component';
import {actions as LoginActions} from '../../Login';
import { removeToken, removeLogin } from "../../utils/parse";

function deleteToken() {
  removeToken();
  removeLogin();
  return LoginActions.setLoginStatus(false)
}
function mapDispatchToProps(dispatch) {
  return {
    onLogout() {
      dispatch(deleteToken());
    }
  }
}

export default connect(null, mapDispatchToProps)(TopBar);