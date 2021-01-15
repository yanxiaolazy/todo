import { connect } from "react-redux";
import TextModule from './component';
import * as actions from '../actions';

function getTextModule(state, moduleId, id) {
  let temp;

  state.forEach(f => {
    if (f.moduleId === moduleId) {
      temp = getText(f.textList, id);
    }
  });
  return temp;
}

function getText(state, id) {
  let temp;

  state.forEach(f => {
    if (f.id === id) {
      temp = f.text;
    }
  });

  return temp;
}

function mapStateToProps(state, ownProps) {
  const {id, moduleId} = ownProps;
  return {
    value: getTextModule(state.textModule, moduleId, id)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {id, moduleId} = ownProps;
  console.log(id, moduleId)
  return {
    onChange(content) {
      dispatch(actions.addValue(moduleId, id, content));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextModule);