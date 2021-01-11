import { connect } from "react-redux";
import TopBar from  './component';
import {actions as LoginActions} from '../../Login';

function deleteToken() {
  sessionStorage.removeItem('token');
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