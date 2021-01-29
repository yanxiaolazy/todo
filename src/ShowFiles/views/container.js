import { connect } from "react-redux";
import { getAdmin } from "../../utils/parse";
import { deleteFileApi } from "../../utils/api";
import ShowModule from "./component";
import { actions as fileModuleActions } from "../../FileModule";
import './style.css';

function getModuleItem(state, moduleId) {
  let temp;

  state.forEach(f => {
    if (f.moduleId === moduleId) {
      temp = f.fileList;
    }
  });

  return temp;
}

const resolve = function(dispatch, moduleId, file) {
  return response => {
    dispatch(fileModuleActions.deleteFile(moduleId, file));
  }
}
const reject = error => console.log(error);

function mapStateToProps(state, ownProps) {
  const {fileModule} = state,
        {moduleId} = ownProps;
  
  return {
    lists: getModuleItem(fileModule, moduleId),
    admin: getAdmin()
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {moduleId} = ownProps;

  return {
    onDelete(e) {
      const target = e.target,
            file = target.dataset['id'];

      deleteFileApi({params: {tab: file}})()(resolve(dispatch, moduleId, file), reject);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowModule);

