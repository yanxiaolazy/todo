import {connect} from 'react-redux';
import ModuleItem from "./component";
import * as actions from "../actions";
import generateId from "../../utils/generateId";
import {actions as fileModuleActions} from "../../FileModule";

function getModuleItem(state, moduleId) {
  let textModules, id, title;

  state.forEach(f => {
    if (f.moduleId === moduleId) {
      textModules = f.textModule;
      id = f.id;
      title =f.moduleTitle;
    }
  });


  return {textModules, id, title};
}

function mapStateToProps(state, ownProps) {
  const {moduleId} = ownProps,
        {moduleItem} = state;

  const {textModules, id, title}  = getModuleItem(moduleItem, moduleId);
  return {
    textModules,
    moduleId,
    id,
    title
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {moduleId} = ownProps;

  return {
    onClick(e, initId) {
      const target = e.target;
      const id = generateId(initId)();

      if (target.id === 'add-text') {
        dispatch(actions.addTextModule(moduleId, id));
        dispatch(actions.recordId(moduleId, id));
      } else {
        dispatch(fileModuleActions.addModalStatus(moduleId, id, true));
      }
    },
    onSaveModuleTitle(moduleTitle) {
      dispatch(actions.addModuleTitle(moduleId, moduleTitle));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleItem);


