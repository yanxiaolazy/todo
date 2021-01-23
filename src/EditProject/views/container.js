import { connect } from "react-redux";
import EditProject from "./EditProject";
import generateId from "../../utils/generateId";
import * as actions from "../actions";
import { actions as moduleItemActions } from "../../ModuleItem";
import { actions as fileModuleActions } from "../../FileModule";
import { actions as textModuleActions } from "../../TextModule";
import { newProjectApi } from "../../utils/api";
import { message } from "antd";

const resolve = function (dispatch, history) {
  return response => {
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
    moduleItems:state.project?.modules || [],
    title: state.project.projectTitle,
    stateStore: state
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {history, location} = ownProps,
        createModuleId = generateId();

  return {
    // 这里统一处理数据
    addModuleItem() {
      const moduleId = createModuleId();
      dispatch(actions.addModuleItem(moduleId))
    },
    onAddProjectTitle(projectTitle) {
      dispatch(actions.addProjectTitle(projectTitle));
    },
    onPublish(props) {//处理数据提交，和重置
      //数据提交给后台
      //do something
      const {project, moduleItem, fileModule, textModule} = props;
      console.log(project)
      const editProject ={
        projectTitle: project.projectTitle,
        project,
        moduleItem,
        fileModule,
        textModule
      };

      if (!project.projectTitle) {
        message.warning('标题是必要的');
        return;
      }

      const params = {};
      if (location.search) {
        params.id = location.search;
      }

      newProjectApi({params})({data: {...editProject}})(resolve(dispatch, history), reject);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);