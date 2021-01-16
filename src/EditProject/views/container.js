import { connect } from "react-redux";
import EditProject from "./EditProject";
import ModuleItem from "../../ModuleItem";
import generateId from "../../utils/generateId";
import * as actions from "../actions";
import { actions as moduleItemActions } from "../../ModuleItem";
import { actions as fileModuleActions } from "../../FileModule";
import { actions as textModuleActions } from "../../TextModule";
import { newProjectApi } from "../../utils/api";

const resolve = function (dispatch, history) {
  return response => {
    console.log('new project -- ', response);
    //reset 'project'
    dispatch(actions.reset());
    //reset 'moduleItem'
    dispatch(moduleItemActions.reset());
    //reset 'fileModule'
    dispatch(fileModuleActions.reset());
    //reset 'textModule'
    dispatch(textModuleActions.reset());
    //router 跳转
    history.push('/view');
  }
}
const reject = error => console.log(error);


function mapStateToProps(state) {
  return {
    moduleItems:state.project?.modules || []
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {history} = ownProps,
        createModuleId = generateId();
  console.log('dispatch -- ',dispatch)
  console.log('ownProps --- ', ownProps)
  return {
    // 这里统一处理数据
    addModuleItem() {
      const moduleId = createModuleId();
      dispatch(actions.addModuleItem(moduleId, <ModuleItem {...{moduleId}} key={moduleId}/>))
    },
    onAddProjectTitle(projectTitle) {
      dispatch(actions.addProjectTitle(projectTitle));
    },
    onPublish() {//处理数据提交，和重置
      //数据提交给后台
      //do something
      newProjectApi()({data: 'new Project'})(resolve(dispatch, history), reject);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);