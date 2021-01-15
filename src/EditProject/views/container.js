import { connect } from "react-redux";
import EditProject from "./EditProject";
import ModuleItem from "../../ModuleItem";
import * as actions from "../actions";
import generateId from "../../utils/generateId";

function mapStateToProps(state) {
  return {
    moduleItems:state.project?.modules || []
  }
}

function mapDispatchToProps(dispatch) {
  const createModuleId = generateId();
  
  return {
    // 这里统一处理数据
    addModuleItem() {
      const moduleId = createModuleId();
      dispatch(actions.addModuleItem(moduleId, <ModuleItem {...{moduleId}} key={moduleId}/>))
    },
    onAddProjectTitle(projectTitle) {
      console.log(projectTitle);
      dispatch(actions.addProjectTitle(projectTitle));
    },
    onPublish(value) {
      console.log(value)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProject);