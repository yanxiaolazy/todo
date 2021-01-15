import { connect } from "react-redux";
import { uploadApi, deleteFileApi } from "../../utils/api";
import FileModule from "./component";
import * as actions from "../actions";

function getModalStatus(state, moduleId, id) {
  const temp = state.concat();

  const modal =  temp.filter(f => f.moduleId === moduleId);

  if (modal.length === 0) return false;
  return modal[0].isOpenModal;
}

function mapStateToProps(state, ownProps) {
  const {moduleId, id} = ownProps;
  return {
    isOpen: getModalStatus(state.fileModule, moduleId, id)
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {moduleId, id} = ownProps;
  return {
    uploadAction() {
      return uploadApi;
    },
    onChange(files) {
      dispatch(actions.addFile(moduleId, id, files.fileList));
    },
    async onRemove(file) {
      let isRemove = false;
      
      try {
        const remove = await new Promise((resolve, reject) => {
          deleteFileApi({params: {tab: file.name}})()(resolve, reject);
        });

        if (remove.code === 200) {
          isRemove = true;
        }
      } catch (error) {
        console.log(error)
      }

      return isRemove
    },
    onCancel() {
      dispatch(actions.addModalStatus(moduleId, id, false));
    },
    onOk() {
      dispatch(actions.addModalStatus(moduleId, id, false));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileModule);