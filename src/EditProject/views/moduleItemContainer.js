import { connect } from "react-redux";
import AddItem from "./AddItem";
import * as actions from "../actions";
import TextModule from "../../TextModule";
import { actions as fileModuleActions } from "../../FileModule";

function filterFileList(state, id) {
  const temp = state.concat();

  const modal =  temp.filter(f => f.id === id);
  if (modal.length === 0) return []
  return modal[0].fileList;
}
function filterModules(state, id) {
  console.log('modules:,', state)
  if (!state) return;
  const temp = state.concat();

  temp.forEach(f => {})
  return state
}

function mapStateToProps(state, ownProps) {
  // id为每个模块的id,其他地方同理
  const {id} = ownProps;
  return {
    ...ownProps,
    modules: filterModules(state.addProject.modules, id),
    fileList: filterFileList(state.fileModule, id)
  }
}

let count = 0;

function mapDispatchToProps(dispatch, ownProps) {
  const {id} = ownProps;
  console.log('id:', id)
  return {
    onClick(e) {
      const target = e.target;

      if (target.id === 'add-text') {
        dispatch(actions.addModule(id, <TextModule moduleId={id} id={count} key={`text-${count++}`} />));
      } else {
        dispatch(fileModuleActions.addModalStatus(id, true));
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItem);