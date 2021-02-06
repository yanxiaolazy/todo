import { connect } from "react-redux";
import TopBar from  './component';
import {actions as LoginActions} from '../../Login';
import { removeToken } from "../../utils/parse";

function deleteToken() {
  removeToken();
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