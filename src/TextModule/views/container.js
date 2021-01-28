import { connect } from "react-redux";
import TextModule from './component';
import * as actions from '../actions';
import { getUser } from "../../utils/parse";
import { actions as moduleItemActions } from "../../ModuleItem";

function getTextModule(state, moduleId, id, type) {
  let temp;

  state.forEach(f => {
    if (f.moduleId === moduleId) {
      temp = getText(f.textList, id, type);
    }
  });
  return temp;
}

function getText(state, id, type) {
  let temp;

  state.forEach(f => {
    if (f.id === id) {
      temp = f[type];
    }
  });

  return temp;
}

function mapStateToProps(state, ownProps) {
  const {id, moduleId} = ownProps;
  return {
    value: getTextModule(state.textModule, moduleId, id, 'text'),
    username: getTextModule(state.textModule, moduleId, id, 'username'),
    lastTime: getTextModule(state.textModule, moduleId, id, 'lastTime')
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {id, moduleId} = ownProps;

  return {
    onChange(text) {
      const payload = {
        text, 
        username: getUser('todo-login'), 
        lastTime: Date.now(), 
        todoStatus: 'pending'
      }
      dispatch(actions.addValue(moduleId, id, payload));
    },
    onDelete() {
      dispatch(moduleItemActions.deleteTextModule(moduleId, id));
      dispatch(actions.deleteText(moduleId, id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextModule);