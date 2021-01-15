import * as actionTypes from "./actionTypes";

export function addFile(moduleId, id, file) {
  return {
    type: actionTypes.ADD_FILE,
    moduleId,
    id, 
    file
  }
}

export function addModalStatus(moduleId, id, isOpenModal) {
  return {
    type: actionTypes.IS_OPEN_MODAL,
    moduleId,
    id,
    isOpenModal
  }
}