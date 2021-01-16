import {connect} from 'react-redux';
import ModuleItem from "./component";
import TextModule from "../../TextModule";
import FileModule from "../../FileModule";
import * as actions from "../actions";
import generateId from "../../utils/generateId";
import {actions as fileModuleActions} from "../../FileModule";

function getModuleItem(state, moduleId, type) {
  let temp;

  state.forEach(f => {
    if (f.moduleId === moduleId) {
      temp = f[type];
    }
  });

  return temp;
}

function mapStateToProps(state, ownProps) {
  const {moduleId} = ownProps,
        {moduleItem, fileModule} = state;
  
  return {
    textModules: getModuleItem(moduleItem, moduleId, 'textModule'),
    fileModule: getModuleItem(moduleItem, moduleId, 'fileModule'),
    fileList: getModuleItem(fileModule, moduleId, 'fileList')
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {moduleId} = ownProps;
  const createSubModuleId = generateId();
  return {
    onClick(e) {
      const target = e.target;
      const id = createSubModuleId();

      if (target.id === 'add-text') {
        dispatch(actions.addTextModule(moduleId, id, <TextModule {...{id, moduleId}} key={id}/>));
      } else {
        dispatch(actions.addFileModule(moduleId, id, <FileModule {...{id, moduleId}} key={id}/>));
        dispatch(fileModuleActions.addModalStatus(moduleId, id, true));
      }
    },
    onSaveModuleTitle(moduleTitle) {
      dispatch(actions.addModuleTitle(moduleId, moduleTitle));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModuleItem);


