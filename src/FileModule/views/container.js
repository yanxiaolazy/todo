import { connect } from "react-redux";
import { uploadApi, deleteFileApi } from "../../utils/api";
import FileModule from "./component";
import * as actions from "../actions";
import { notification } from "antd";

function getFileModule(state, moduleId, type) {
  const temp = state.concat();

  const modal =  temp.filter(f => f.moduleId === moduleId);

  if (modal.length === 0) return false;
  return modal[0][type];
}

function mapStateToProps(state, ownProps) {
  const {moduleId} = ownProps,
        {fileModule} = state;
  return {
    isOpen: getFileModule(fileModule, moduleId, 'isOpenModal'),
    fileList: getFileModule(fileModule, moduleId, 'fileList')
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  const {moduleId, id} = ownProps;
  return {
    uploadAction() {
      return uploadApi;
    },
    onChange(files) {
      const fileList = files.fileList.filter(file => {
        if (file.status === 'error') {
          notification.error({message: 'Error', description: `\`${file.name}\` upload failed`, placement: 'topLeft'})
        }
        return file.status !== 'error'
      });
      setTimeout(dispatch, 200, actions.addFile(moduleId, id, fileList));
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
        console.log(error);
      }

      return isRemove;
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