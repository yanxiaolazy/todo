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

export function reset() {
  return {
    type: actionTypes.RESET
  }
}

export function deleteFile(moduleId, file) {
  return {
    type: actionTypes.DELETE,
    moduleId,
    file
  }
}

export function init(init) {
  return {
    type: actionTypes.INIT,
    init
  }
}

